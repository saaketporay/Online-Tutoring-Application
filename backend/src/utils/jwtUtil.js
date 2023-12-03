const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const KEY = 'supersecret';

const decodeToken = (token) => {
  try {
    token = token.split("Bearer ")[1];
    const decoded = jwt.verify(token, KEY);
    return decoded;
  } catch (err) {
    return null; // Token is invalid or expired
  }
};

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.user_id,
      email: user.email,
    },
    KEY,
    {
      expiresIn: '24hr',
    }
  );
  return token;
};

module.exports = {
  decodeToken,
  generateToken,
};

