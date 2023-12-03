// user auth controller

const {
  getUserByEmail,
  createUser,
  createTutor,
  getUserByID,
  getUserSecret,
  updateTutoringHours,
  updateUser,
} = require('../models/User');
const { getTutorByID, updateTutor } = require('../models/Tutor');
const Appointment = require('../models/Appointment');

const { comparePasswords, hashPassword } = require('../utils/passwordUtils');
const { decodeToken, generateToken } = require('../utils/jwtUtil');
const { sendTOTP } = require('../utils/totp');
const { checkCriminalDB } = require('../utils/isCriminal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');

const getUserInfo = async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = decodeToken(token);
  if (decodedToken == null) {
    return res.status(401).send('Invalid or expired credentials');
  }
  try {
    const student_Id = decodedToken.id;
    const user = await getUserByID(student_Id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    let appointments;
    let tutor;
    if (user.user_type === 'student') {
      appointments = await Appointment.getByStudentId(student_Id);
      return res.status(200).json({ user, appointments });
    } else if (user.user_type == 'tutor') {
      tutor = await getTutorByID(user.user_id);
      appointments = await Appointment.getByTutorId(tutor.tutor_id);
    }
    let past_appointments = 0;
    // Update total_tutoring_hours for passed appointments
    for (const appointment of appointments) {
      const appointmentDate = new Date(appointment.date_time);

      if (appointmentDate < new Date()) {
        past_appointments += 1;
        // If the appointment date has passed, update total_tutoring_hours by 1
      }
    }
    await updateTutoringHours(user.user_id, past_appointments);
    // return res.status(200).json({ user, appointments });
    if (user.user_type === 'student') {
      return res.status(200).json({ user, appointments });
    } else if (user.user_type === 'tutor') {
      return res.status(200).json({ user, appointments, tutor });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const getTutorInfo = async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = decodeToken(token);
  try {
    const user_Id = decodedToken.id;
    const tutorInfo = await getTutorByID(user_Id);
    console.log('tutorInfo', tutorInfo);

    const schedule = tutorInfo.Tutor_Availabilities.map((timeslot) =>
      timeslot.date_time.toISOString()
    );
    const sunday = new Date(schedule[0]);
    sunday.setDate(sunday.getDate() - sunday.getDay());

    const data = {
      first_name: tutorInfo.User.first_name,
      last_name: tutorInfo.User.last_name,
      email: tutorInfo.User.email,
      about_me: tutorInfo.about_me,
      selected_subjects: tutorInfo.Subjects,
      pfp: tutorInfo.profile_picture,
      schedule,
      sunday,
    };

    console.log('data', data);

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user || !(await comparePasswords(password, user.hashed_password))) {
      return res.status(400).send('Failed to login. Wrong credentials');
    }

    try {
      // Send TOTP to the user's email
      await sendTOTP(user.email);
      // Indicate that further verification is needed
      return res
        .status(200)
        .send('TOTP sent to email. Please verify to complete login.');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error sending TOTP: ' + error.message);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    user_type,
    about_me,
    profile_picture,
    subjects,
    schedule,
  } = req.body;

  // Check for criminal record if user is a tutor
  const criminal = await checkCriminalDB(first_name, last_name);
  if (criminal && user_type === 'tutor') {
    return res.status(451).send('User is criminal');
  } else {
    // Generate new TOTP secret
    const secret = speakeasy.generateSecret();
    const userSecret = secret.base32;

    try {
      // Hash the password and create a new user
      const hashedPassword = await hashPassword(password);
      const user = await createUser(
        first_name,
        last_name,
        email,
        hashedPassword,
        user_type,
        userSecret
      );
      if (!user) {
        throw new Error('User already exists.');
      }
      const { user_id } = user;

      // Create a tutor profile if user is a tutor
      if (user_type === 'tutor') {
        if (
          profile_picture.length === 0 ||
          about_me.length === 0 ||
          subjects.length === 0 ||
          schedule.length === 0
        ) {
          return res
            .status(401)
            .send(
              'Missing one of the following: profile picture, about me, subjects, schedule'
            );
        }

        await createTutor(
          user_id,
          about_me,
          profile_picture,
          false,
          subjects,
          schedule
        );
      }

      // Send TOTP to the user's email for verification
      await sendTOTP(email);

      return res
        .status(200)
        .send(
          'User registered successfully. TOTP sent to email for verification.'
        );
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
};

const verifyTOTP = async (req, res) => {
  const { email, totp } = req.body;

  try {
    // Retrieve the user's TOTP secret from the database
    const userSecret = await getUserSecret(email);
    if (!userSecret) {
      return res.status(404).send('User not found or no TOTP secret available');
    }

    // Verify the TOTP token
    const verified = speakeasy.totp.verify({
      secret: userSecret,
      encoding: 'base32',
      token: totp,
      step: 120,
      window: 1, // Allowing a bit of flexibility in timing
    });

    if (verified) {
      // TOTP is correct
      // Retrieve user details for token generation
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).send('User not found');
      }

      // Generate JWT token
      const token = generateToken(user);

      return res.status(200).json({
        message: 'TOTP verified successfully',
        token: token,
        user_type: user.user_type,
      });
    } else {
      // TOTP is incorrect
      return res.status(400).send('Invalid TOTP');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

const edit = async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = decodeToken(token);
  const user_id = decodedToken.id;

  const {
    first_name,
    last_name,
    email,
    password,
    user_type,
    about_me,
    profile_picture,
    subjects,
    schedule,
  } = req.body;

  try {
    errors = [];
    if (email.length > 0 && !email.toString().includes('@')) {
      errors.push('Email address is invalid.');
    }
    if (password.length > 0 && password.toString().length < 9) {
      errors.push('Password must have at least 8 characters.');
    }
    if (
      password.length > 0 &&
      password.toString().search(/[`~!@#%&-=_,.<>;]/g) === -1
    ) {
      errors.push(
        'Password must contain one of the following special characters: `~!@#%&-=_,.<>;'
      );
    }
    if (errors.length > 0) {
      errors = errors.reduce((acc, cur) => acc + ' ' + cur);
      return res.status(403).send(errors);
    }

    const hashedPassword = await hashPassword(password);

    await updateUser(user_id, first_name, last_name, email, hashedPassword);

    // Create a tutor profile if user is a tutor
    if (user_type === 'tutor') {
      await updateTutor(user_id, about_me, profile_picture, subjects, schedule);
    }

    return res.status(200).send('User info updated successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  login,
  register,
  sendTOTP,
  verifyTOTP,
  getUserInfo,
  getTutorInfo,
  edit,
};
