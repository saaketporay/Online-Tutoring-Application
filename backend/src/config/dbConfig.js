const mysql = require('mysql2')
require('dotenv').config({ path: __dirname + '/../../.env' });

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to RDS: ", err.stack);
        return;
    }
    console.log("Connected to RDS as thread id: ", connection.threadId);
});

module.exports = connection;