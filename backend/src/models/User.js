// functions to intereact with the users table

// config for RDS
const { connection } = require('../config/dbConfig')

const getUserByEmail = async (email) => {
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const createUser = async (email, firstname, lastname, password, user_type) => {
    try
    {
        console.log(connection);
        const [result] = await connection.query(`INSERT INTO Users (first_name, last_name, email, hashed_password, user_type, total_tutoring_hours) VALUES ('${firstname}', '${lastname}', '${email}', '${password}', '${user_type}', 0);`);
        return true;
    }
    catch (err)
    {
        return err;
    }
};

module.exports = 
{
    getUserByEmail,
    createUser,
};