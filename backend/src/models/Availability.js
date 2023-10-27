// functions to interact with the Tutors table

// Import the database connection
const connection = require('../config/dbConfig');

const Availability = {
  getAllTimesByTutorId: async (tutorId) => {
    try {
      const availableQuery = `SELECT * FROM Tutor_Availability WHERE tutor_id = ?;`;
      const results = await connection
        .promise()
        .query(availableQuery, [tutorId]);
      return results[0];
    } catch (err) {
      return err;
    }
  },
  getTutorNameByTutorId: async (userId) => {
    try {
      const availableQuery = `SELECT first_name, last_name FROM Users WHERE user_id = (SELECT user_id FROM Tutors WHERE tutor_id = ?);`;
      const results = await connection
        .promise()
        .query(availableQuery, [userId]);
      return results[0][0];
    } catch (err) {
      return err;
    }
  },
  getAllSubjects: async () => {
    try {
      const availableQuery = `SELECT * FROM Subjects;`;
      const results = await connection.promise().query(availableQuery);
      return results[0];
    } catch (err) {
      return err;
    }
  },
  getAllTutors: async () => {
    try {
      const availableQuery = `SELECT * FROM Tutors;`;
      const results = await connection.promise().query(availableQuery);
      return results[0];
    } catch (err) {
      return err;
    }
  },
  getAllTutorsBySubjectId: async (subjectId) => {
    try {
      const availableQuery = `SELECT * FROM Tutor_Subjects WHERE subject_id = ?;`;
      const results = await connection
        .promise()
        .query(availableQuery, [subjectId]);
      return results[0];
    } catch (err) {
      return err;
    }
  },
};

module.exports = Availability;
