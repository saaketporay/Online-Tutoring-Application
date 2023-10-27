// functions to interact with the Tutors table

// Import the database connection
const connection = require('../config/dbConfig');


const TutorAvailability = 
{
    getAllByTutorId: async (tutorId) => {
        try 
        {
            const availableQuery = `SELECT * FROM Tutor_Availability WHERE tutor_id = ?;`
            const results = await connection.promise().query(availableQuery, [tutorId]);
            return results;
        }
        catch (err)
        {
            return err;
        }
    }
}

module.exports = TutorAvailability;
