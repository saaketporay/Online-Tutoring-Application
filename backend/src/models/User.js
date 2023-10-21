// functions to intereact with the users table

// config for RDS
const { connection } = require('../config/dbConfig')

const getUserByEmail = async (email) => {
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const createUser = async (email, firstname, lastname, password, user_type, total_tutoring_hours) => {
    const [result] = await connection.query('INSERT INTO users (email, firstname, lastname, password, user_type, total_tutoring_hours) VALUES (?, ?, ?, ?, ?, ?)', [email, firstname, lastname, password, user_type, total_tutoring_hours]);
    return result.insertId;
};

module.exports = 
{
    getUserByEmail,
    createUser,
};