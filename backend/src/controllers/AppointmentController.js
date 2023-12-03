const Appointment = require('../models/Appointment');
const jwtUtil = require('../utils/jwtUtil');
const { getUserByID } = require('../models/User');
const { getTutorByID } = require('../models/Tutor');

const appointmentController = {
  createAppointment: async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwtUtil.decodeToken(token);
    
    const { tutor_id, date_time, duration, meeting_title, meeting_desc } =
      req.body;

    console.log(
      token,
      tutor_id,
      date_time,
      duration,
      meeting_title,
      meeting_desc
    );

    const student_Id = decodedToken.id;

    try {
      const appointment_id = await Appointment.create(
        student_Id,
        tutor_id,
        date_time,
        duration,
        meeting_title,
        meeting_desc
      );
      console.log(appointment_id);
      return res.status(200).json(appointment_id);
    } catch (err) {
      return res.status(500).send('Internal Server Error');
    }
  },

  getByToken: async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwtUtil.decodeToken(token);
    try {
      const user = await getUserByID(decodedToken.id);
      let appointments;
      if (user.user_type == 'student') {
        appointments = await Appointment.getByStudentId(user.user_id);
      }
      else if (user.user_type == 'tutor') {
        const { tutor_id } = await getTutorByID(user.user_id);
        appointments = await Appointment.getByTutorId(tutor_id);
      }
      else {
        throw new Error("Invalid user");
      }
      console.log(appointments);
      return res.status(200).json(appointments[0]);
      
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  deleteByApptId: async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwtUtil.decodeToken(token);
    try {
      const appointments = await Appointment.getByStudentId(decodedToken.id);
      const { appt_id } = req.params;
      const appt = appointments.find((appt) => appt.appointment_id == appt_id);
      if (!appt) {
        return res.status(401).send("User is not authorized to delete appointment or appointment does not exist");
      }
      const today = new Date();
      const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      const difference = Math.round(Math.abs((appt.date_time - today) / oneDay));
      if (difference > 1) {
        await Appointment.deleteByApptId(appt_id);
        return res.status(200).send("Appointment successfully deleted");
      } else {
        return res.status(403).send("Appointment cannot be cancelled 24 hours before the arranged date.");
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};

module.exports = appointmentController;
