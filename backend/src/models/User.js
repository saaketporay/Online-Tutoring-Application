// functions to intereact with the users table

// config for RDS
const { pool } = require('../config')

const getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const createUser = async (user_id, email, firstname, lastname, password, user_type, total_tutoring_hours) => {
    const [result] = await pool.query('INSERT INTO users (email, firstname, lastname, password, user_type, total_tutoring_hours) VALUES (?, ?, ?, ?, ?, ?)', [email, firstname, lastname, password, user_type, total_tutoring_hours]);
    return result.insertId;
};

module.exports = 
{
    getUserByEmail,
    createUser,
};