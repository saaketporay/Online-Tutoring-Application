// functions to interact with the Tutors table

// Import the database connection
const connection = require('../config/dbConfig');

const createTutor = async (userId, aboutMe = '', profilePicture = '', isCriminal = false) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO Tutors (user_id, about_me, profile_picture, is_criminal) VALUES (?, ?, ?, ?);`,
            [userId, aboutMe, profilePicture, isCriminal]
        );
        const tutorId = result.insertId;
        console.log(`New tutor created with ID: ${tutorId}`);
        return tutorId;
    } catch (err) {
        console.error(err);
        return err;
    }
};

module.exports = {
    createTutor,
};
