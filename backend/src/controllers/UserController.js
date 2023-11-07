// user auth controller

const { getUserByEmail, createUser } = require('../models/User');
const { createTutor } = require('../models/Availability'); // Import createTutor function
const { comparePasswords, hashPassword } = require('../utils/passwordUtils');
const { decodeToken, generateToken } = require('../utils/jwtUtil');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    console.log(user);
    if (!user || !(await comparePasswords(password, user.hashed_password))) {
      return res.status(400).send('Failed to login. Wrong credentials');
    }

    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    user_type,
    about_Me,
    profile_Picture,
    is_Criminal,
  } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user_Id = await createUser(
      first_name,
      last_name,
      email,
      hashedPassword,
      user_type
    );
    console.log(`New User ID: ${user_Id}`);

    // If user is a tutor, create a corresponding entry in the Tutors table
    if (user_type === 'tutor') {
      const tutorId = await createTutor(
        user_Id,
        about_Me,
        profile_Picture,
        is_Criminal
      );
      console.log(`New Tutor created with ID: ${tutorId}`);
    }
    const user = await getUserByEmail(email);
    const token = generateToken(user);
    return res.status(200).json({ token });
    //return res.status(200).send('Register Successful: ');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = {
  login,
  register,
};
