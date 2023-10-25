const { createTutor, getTutorByEmail } = require('../models/Tutor');
const { comparePasswords } = require('../utils/passwordUtils');

const signUpTutor = async (req, res) => {
  const { first_name, last_name, email, hashed_password, about_me, profile_picture, is_criminal } = req.body;
  
  try {
    const tutorResult = await createTutor(first_name, last_name, email, hashed_password, about_me, profile_picture, is_criminal);
    
    if (tutorResult) {
      return res.status(201).json({ message: "Tutor created successfully!" });
    } else {
      return res.status(400).json({ message: "Failed to create tutor." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

const login = async (req, res) => {
  const { email, hashed_password } = req.body;

  try {
    const tutor = await getTutorByEmail(email);
    if (!tutor || !(await comparePasswords(hashed_password, tutor.hashed_password))) {
      return res.status(400).send('Failed to login. Wrong credentials');
    }
    return res.status(200).send('Login Successful');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  signUpTutor,
  login,
};
