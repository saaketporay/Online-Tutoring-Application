// user auth controller

const { getUserByEmail, createUser, createTutor } = require("../models/User");
const { comparePasswords, hashPassword } = require("../utils/passwordUtils");
const { decodeToken, generateToken } = require("../utils/jwtUtil");
const { sendEmail } = require("../utils/mailer.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    console.log(user);
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
    console.error(err);
    res.status(500).send("Internal Server Error");
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
    is_criminal,
    courses,
    schedule,
    hourly_chunks,
  } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user_id = await createUser(
      first_name,
      last_name,
      email,
      hashedPassword,
      user_type,
      phone_number
    );

    if (!user_id) {
      throw new Error("User already exists.");
    }

    console.log("Hashed Password:", hashedPassword);
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
    secret: "Your static or dynamic secret",
    encoding: "base32",
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

module.exports = {
  login,
  register,
  sendTOTP, 
};
