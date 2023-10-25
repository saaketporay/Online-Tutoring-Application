// functions to intereact with the users table

// config for RDS
const connection = require('../config/dbConfig')

const getUserByEmail = async (email) => {
    const [rows, fields] = await connection.promise().query(`SELECT * FROM Users WHERE email = '${email}';`);
    console.log(rows[0])
    return rows[0];
};

const createUser = async (firstname, lastname, email, password, user_type) => {
    try
    {
        const [result] = await connection.promise().query(`INSERT INTO Users (first_name, last_name, email, hashed_password, user_type) VALUES ('${firstname}', '${lastname}', '${email}', '${password}', '${user_type}');`);
        await getUserByEmail(email);
        console.log(email)
        return result[0];
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