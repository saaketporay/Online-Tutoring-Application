// user auth controller

 const { getUserByEmail, createUser } = require('../models/User');
 const { createTutor } = require("../models/Tutor"); // Import createTutor function
 const { comparePasswords, hashPassword } = require('../utils/passwordUtils')
 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');

 const KEY = 'supersecret';

 const generateToken = (user) => {
     const token = jwt.sign(
         {
             id: user.user_id, email: user.email
         },
         KEY,
         {
             expiresIn: '1h'
         }
     );
     return token;
 };

const login = async (req, res) => {
  const { email, hashed_password } = req.body;

  try {
    const user = await getUserByEmail(email);
    console.log(hashed_password);
    if (
      !user ||
      !(await comparePasswords(hashed_password, user.hashed_password))
    ) {
      return res.status(400).send("Failed to login. Wrong credentials");
    }

        const token = generateToken(user);
        console.log(token);
        res.json({token});
        return token;
    }
    catch (err)
    {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
 };

const register = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    user_type,
    aboutMe,
    profilePicture,
    isCriminal,
  } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const userId = await createUser(
      firstname,
      lastname,
      email,
      hashedPassword,
      user_type
    );
    console.log(`New User ID: ${userId}`);

    // If user is a tutor, create a corresponding entry in the Tutors table
    if (user_type === "tutor") {
      const tutorId = await createTutor(
        userId,
        aboutMe,
        profilePicture,
        isCriminal
      );
      console.log(`New Tutor created with ID: ${tutorId}`);
    }

    return res.status(200).send("Register Successful: ");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

 module.exports = 
 {
    login,
    register,
 };