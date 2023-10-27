const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        return null; // Token is invalid or expired
    }
  };