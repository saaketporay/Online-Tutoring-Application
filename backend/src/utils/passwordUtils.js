// util function to hash passwords and check user auth

const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };
  
  const comparePasswords = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  };

module.exports =
{
    hashPassword,
    comparePasswords,
};
