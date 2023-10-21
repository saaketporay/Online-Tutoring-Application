// functions to intereact with the users table

// config for RDS
const connection = require('../config/dbConfig')

const getUserByEmail = async (email) => {
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

function createUser(email, firstname, lastname, password, user_type) {
    try {
        console.log(email, firstname, lastname, password, user_type);
        const query = 'INSERT INTO Users (first_name, last_name, email, hashed_password, user_type, total_tutoring_hours) VALUES (?, ?, ?, ?, ?, 0)';
        connection.query(query, [firstname, lastname, email, password, user_type], (error, results) => {
            if (error) {
                console.error(error);
            }
        });
        return 1;
    } catch (err) {
        console.log(err);
        return 0;
    }
}

module.exports = 
{
    getUserByEmail,
    createUser,
};