// user auth controller

const {
  getUserByEmail,
  createUser,
  createTutor,
  getUserByID,
} = require('../models/User');
const { getTutorByID } = require('../models/Tutor');
const Appointment = require('../models/Appointment');

const { comparePasswords, hashPassword } = require('../utils/passwordUtils');
const { decodeToken, generateToken } = require('../utils/jwtUtil');
const { checkCriminalDB } = require('../utils/isCriminal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getUserInfo = async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = decodeToken(token);
  if (decodedToken == null) {
    return res.status(401).send("Invalid or expired credentials")
  }
  try {
    const student_Id = decodedToken.id;
    const user = await getUserByID(student_Id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    let appointments;
    if (user.user_type == 'student') {
      appointments = await Appointment.getByStudentId(student_Id);
      return res.status(200).json({ user, appointments });
    } else if (user.user_type == 'tutor') {
      const tutor = await getTutorByID(user.user_id);
      appointments = await Appointment.getByTutorId(tutor.tutor_id);
      return res.status(200).json({ user, tutor, appointments })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    console.log(user);
    if (!user || !(await comparePasswords(password, user.hashed_password))) {
      return res.status(400).send('Failed to login. Wrong credentials');
    }

    const token = generateToken(user);
    const { user_type } = user;
    return res.status(200).json({
      token: token,
      user_type: user_type,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const register = async (req, res) => {
  console.log(req.body);
  const {
    first_name,
    last_name,
    email,
    password,
    user_type,
    phone_number,
    about_me,
    profile_picture,
    subjects,
    schedule,
    hourly_chunks,
  } = req.body;
  const criminal = await checkCriminalDB(first_name, last_name);
  if (criminal && user_type === 'tutor') {
    return res.status(403).send('User is criminal');
  } else {
    try {
      const hashedPassword = await hashPassword(password);
      const user = await createUser(
        first_name,
        last_name,
        email,
        hashedPassword,
        user_type,
        phone_number
      );

      if (!user.user_id) {
        throw new Error('User already exists.');
      }

      console.log('Hashed Password:', hashedPassword);
      // If user is a tutor, create a corresponding entry in the Tutors table
      if (user_type === 'tutor') {
        await createTutor(
          user.user_id,
          about_me,
          profile_picture,
          false,
          subjects,
          schedule,
          hourly_chunks
        );
      }
      const token = generateToken(user);
      return res.status(200).json({
        token: token,
        user_type: user_type,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = {
  login,
  register,
  getUserInfo,
};
