// functions to intereact with the users table

// config for RDS
const connection = require('../config/dbConfig');

const getUserByEmail = async (email) => {
    const [rows, fields] = await connection.promise().query(`SELECT * FROM Users WHERE email = '${email}';`);
    console.log(rows[0])
    return rows[0];
};


const createUser = async (firstname, lastname, email, password, user_type) => {
    try
    {
        // const [check_user] = await getUserByEmail(email);
        // console.log(check_user)
        // if (check_user)
        // {
        //     return false;
        // }
        const [result] = await connection.promise().query(`INSERT INTO Users (first_name, last_name, email, hashed_password, user_type) VALUES (?, ?, ?, ?, ?);`, [firstname, lastname, email, password, user_type]);
        const userId = result.insertId;
        console.log(`New user created with ID: ${userId}`);
        return userId;
    }
    catch (err)
    {
        return err;
    }
};

const getAllUserInfo = async (email) => {
    try {
        const [rows, fields] = await connection.promise().query(`SELECT * FROM Users WHERE email = '${email}';`);
        console.log(rows[0]);
        return rows[0];
        
      } 
      catch (error) 
      {
        return error;
      }
    };



module.exports = 
{
    getUserByEmail,
    createUser,
    getAllUserInfo
};