require('dotenv').config({ path: __dirname + '/../../.env' });
const db = require('./dbConfig');

// Use the connection to query the database
db.query('SHOW tables', (error, results) => {
    if (error) throw error;
    console.log(results);
   
    db.end(); 
});
