const connection = require('../config/dbConfig');

const Appointment = {
  create: async (student_id, tutor_id, date_time, duration) => {
    try {
      const addAppointmentQuery = `INSERT INTO Appointments (student_id, tutor_id, date_time, duration) VALUES (?, ?, ?, ?);`;
      const results = await connection
        .promise()
        .query(addAppointmentQuery, [
          student_id,
          tutor_id,
          date_time,
          duration,
        ]);
      console.log(results[0].insertId);
      return results[0].insertId;
    } catch (err) {
      return err;
    }
  },
  getByStudentId: async (student_Id) => {
    try {
      const query = `SELECT * FROM Appointments WHERE student_id = '${student_Id}'`;
      const results = await connection.promise().query(query);
      console.log(query);
      return results;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Appointment;
