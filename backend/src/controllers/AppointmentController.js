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
      if (appointments.find((appt) => appt.appt_id == appt_id)) {
        await Appointment.deleteByApptId(appt_id);
      } else {
        return res.status(401).send("User is not authorized to delete appointment or appointment does not exist")
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};

module.exports = appointmentController;
