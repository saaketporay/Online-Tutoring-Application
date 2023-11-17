// user auth controller
const {
  getUserByEmail,
  createUser,
  createTutor,
  getUserSecret,
} = require("../models/User");
const { comparePasswords, hashPassword } = require("../utils/passwordUtils");
const { decodeToken, generateToken } = require("../utils/jwtUtil");
const { sendTOTP } = require("../utils/totp");
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
    is_criminal,
    courses,
    schedule,
    hourly_chunks,
  } = req.body;

  //generate new totp secret
  const secret = speakeasy.generateSecret();
  const userSecret = secret.base32;
  console.log(userSecret);

  try {
    const hashedPassword = await hashPassword(password);
    const user_id = await createUser(
      first_name,
      last_name,
      email,
      hashedPassword,
      user_type,
      userSecret
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
};
