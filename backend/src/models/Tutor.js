const connection = require('../config/dbConfig');

const createTutor = async (first_name, last_name, email, hashed_password, about_me, profile_picture, is_criminal) => {
  try {
    await connection.promise().query(`INSERT INTO Tutors (first_name, last_name, email, hashed_password, about_me, profile_picture, is_criminal) VALUES ('${first_name}', '${last_name}', '${email}', '${hashed_password}', '${about_me}', '${profile_picture}', ${is_criminal});`);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTutorByEmail = async (email) => {
  const [rows] = await connection.promise().query(`SELECT * FROM Tutors WHERE email = '${email}';`);
  return rows[0];
};

module.exports = {
  createTutor,
  getTutorByEmail,
};
