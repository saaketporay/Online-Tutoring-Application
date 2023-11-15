// user auth controller
require("dotenv").config({ path: __dirname + "/../../.env" });
const { getUserByEmail, createUser, createTutor } = require("../models/User");
const { comparePasswords, hashPassword } = require("../utils/passwordUtils");
const { decodeToken, generateToken } = require("../utils/jwtUtil");
const { sendEmail } = require("../utils/mailer.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user || !(await comparePasswords(password, user.hashed_password))) {
      return res.status(400).send("Failed to login. Wrong credentials");
    }

    const token = generateToken(user);
    const { user_type } = user;
    return res.status(200).json({
      token: token,
      user_type: user_type,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
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
    is_criminal,
    courses,
    schedule,
    hourly_chunks,
  } = req.body;

  //generate new totp secret
  const secret = speakeasy.generateSecret();
  const userSecret = secret.base32;
  console.log(userSecret)

 
  try {
    const hashedPassword = await hashPassword(password);
    const user_id = await createUser(
      first_name,
      last_name,
      email,
      hashedPassword,
      user_type,
      userSecret,
    );

    if (!user_id) {
      throw new Error("User already exists.");
    }

    // If user is a tutor, create a corresponding entry in the Tutors table
    if (user_type === "tutor") {
      const tutorId = await createTutor(
        user_id,
        about_me,
        profile_picture,
        is_criminal,
        courses,
        schedule,
        hourly_chunks
      );
    }
    const user = await getUserByEmail(email);
    const token = generateToken(user);
    return res.status(200).json({
      token: token,
      user_type: user_type,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const sendTOTP = async (req, res) => {
  const { email } = req.body; // Assuming the request body has an 'email' field

  if (!email) {
    return res.status(400).send("Email is required");
  }

  // Generate TOTP
  const token = speakeasy.totp({
    secret: process.env.SECRET_KEY,
    encoding: "base32",
    step: 120,
  });

  // Send email with the TOTP
  try {
    await sendEmail(email, "Your TOTP", `Your one-time password is: ${token}`);
    res.status(200).send("TOTP sent to email");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending TOTP");
  }
};

const verifyTOTP = async (req, res) => {
  const { totp } = req.body;

  // Assuming the user's TOTP secret is stored in user.totp_secret
  const verified = speakeasy.totp.verify({
    secret: process.env.SECRET_KEY,
    encoding: "base32",
    token: totp,
    step: 120,
    window: 1, // Allowing a bit of flexibility in timing
  });

  if (verified) {
    // TOTP is correct
    return res.status(200).send("TOTP verified successfully");
  } else {
    // TOTP is incorrect
    return res.status(400).send(`Invalid TOTP: ${totp}`);
  }
};

module.exports = {
  login,
  register,
  sendTOTP,
  verifyTOTP,
};
