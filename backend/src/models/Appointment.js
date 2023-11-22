const { Scheduled_Appointments: AppointmentModel, User, Tutor } = require('./index')
const Appointment = {
  create: async (student_id, tutor_id, date_time, duration,meeting_title, meeting_desc) => {
    try {
      const newAppointment = await AppointmentModel.create({
        student_id,
        tutor_id,
        date_time,
        duration,
        meeting_title,
        meeting_desc
      });
      console.log(newAppointment.appointment_id);
      return newAppointment.appointment_id;
    } catch (err) {
      return err;
    }
  },
  getByStudentId: async (student_Id) => {
    try {
      const appointments = await AppointmentModel.findAll({
        where: {
          student_id: student_Id,
        },
        include: [
          {
            model: User,
            attributes: ['first_name', 'last_name']
          },
          {
            model: Tutor,
            include: {
              model: User,
              attributes: ['first_name', 'last_name']
            }
          },
        ]
      });
      console.log(appointments);
      return appointments;
    } catch (error) {
      throw error;
    }
  },
  getByTutorId: async (tutor_id) => {
    try {
      const appointments = await AppointmentModel.findAll({
        where: {
          tutor_id: tutor_id,
        },
        include: [
          {
            model: User,
            attributes: ['first_name', 'last_name'],
          },
          {
            model: Tutor,
            include: {
              model: User,
              attributes: ['first_name', 'last_name'],
            },
          },
        ],
      });
      return appointments;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Appointment;
