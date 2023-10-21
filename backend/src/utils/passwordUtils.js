// util function to hash passwords and check user auth

const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
};

const comparePasswords = (plainTextPassword, hashedPassword) => {
    return bcrypt.compareSync(plainTextPassword, hashPassword);
};

module.exports =
{
    hashPassword,
    comparePasswords,
};

