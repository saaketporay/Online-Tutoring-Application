require('dotenv').config({ path: __dirname + '/../../.env' });
const connection = require('./dbConfig');

// Use the connection to query the database
connection.query('SHOW tables', (error, results) => {
    if (error) throw error;
    console.log(results);
   
    connection.end(); 
});
