const Appointment = require('../models/Appointment');
const jwtUtil = require('../utils/jwtUtil');

const appointmentController = {
  createAppointment: async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwtUtil.decodeToken(token);

    const { tutor_Id, date_time, duration, meeting_title, meeting_desc } =
      req.body;

    console.log(
      token,
      tutor_Id,
      date_time,
      duration,
      meeting_title,
      meeting_desc
    );

    const student_Id = decodedToken.id;

    try {
      const appointment_id = await Appointment.create(
        student_Id,
        tutor_Id,
        date_time,
        duration,
        meeting_title,
        meeting_desc
      );
      return res.status(200).json(appointment_id);
    } catch (err) {
      return res.status(500).send('Internal Server Error');
    }
  },

  getByToken: async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwtUtil.decodeToken(token);

    try {
      const appointments = await Appointment.getByStudentId(decodedToken.id);
      console.log(appointments);
      return res.status(200).json(appointments[0]);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = appointmentController;
