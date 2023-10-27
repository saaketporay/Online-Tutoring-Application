const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const KEY = 'supersecret';

const decodeToken = (token) => {
    try {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, KEY);
        return decoded;
    } catch (err) {
        return null; // Token is invalid or expired
    }
  };

  module.exports = decodeToken;