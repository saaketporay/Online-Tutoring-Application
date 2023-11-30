// user auth controller

const {
  getUserByEmail,
  createUser,
  createTutor,
  getUserByID,
  getUserSecret,
} = require("../models/User");
const { getTutorByID } = require("../models/Tutor");
const Appointment = require("../models/Appointment");

const { comparePasswords, hashPassword } = require("../utils/passwordUtils");
const { decodeToken, generateToken } = require("../utils/jwtUtil");
const { sendTOTP } = require("../utils/totp");
const { checkCriminalDB } = require("../utils/isCriminal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");

const getUserInfo = async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = decodeToken(token);
  try {
    const student_Id = decodedToken.id;
    const user = await getUserByID(student_Id);
    let appointments;
    if (user.user_type == "student") {
      appointments = await Appointment.getByStudentId(student_Id);
    } else if (user.user_type == "tutor") {
      const { tutor_id } = await getTutorByID(user.user_id);
      appointments = await Appointment.getByTutorId(tutor_id);
    }
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json({ user, appointments });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user || !(await comparePasswords(password, user.hashed_password))) {
      return res.status(400).send("Failed to login. Wrong credentials");
    }

    try {
      // Send TOTP to the user's email
      await sendTOTP(user.email);
      // Indicate that further verification is needed
      return res
        .status(200)
        .send("TOTP sent to email. Please verify to complete login.");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error sending TOTP: " + error.message);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
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
    hourly_chunks,
  } = req.body;

  // Check for criminal record if user is a tutor
  const criminal = await checkCriminalDB(first_name, last_name);
  if (criminal && user_type === "tutor") {
    return res.status(403).send("User is criminal");
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
        throw new Error("User already exists.");
      }
      const { user_id } = user;
      // Create a tutor profile if user is a tutor
      if (user_type === "tutor") {
        await createTutor(
          user_id,
          about_me,
          profile_picture,
          false,
          subjects,
          schedule,
          hourly_chunks
        );
      }

      // Send TOTP to the user's email for verification
      await sendTOTP(email);

      return res
        .status(200)
        .send(
          "User registered successfully. TOTP sent to email for verification."
        );
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
};

const verifyTOTP = async (req, res) => {
  const { email, totp } = req.body;

  try {
    // Retrieve the user's TOTP secret from the database
    const userSecret = await getUserSecret(email);
    if (!userSecret) {
      return res.status(404).send("User not found or no TOTP secret available");
    }

    // Verify the TOTP token
    const verified = speakeasy.totp.verify({
      secret: userSecret,
      encoding: "base32",
      token: totp,
      step: 120,
      window: 1, // Allowing a bit of flexibility in timing
    });

    if (verified) {
      // TOTP is correct
      // Retrieve user details for token generation
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Generate JWT token
      const token = generateToken(user);

      return res.status(200).json({
        message: "TOTP verified successfully",
        token: token,
        user_type: user.user_type,
      });
    } else {
      // TOTP is incorrect
      return res.status(400).send("Invalid TOTP");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  login,
  register,
  sendTOTP,
  verifyTOTP,
  getUserInfo,
};
