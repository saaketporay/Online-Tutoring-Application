const { Appointment: AppointmentModel } = require('./index')
const Appointment = {
  create: async (student_id, tutor_id, date_time, duration) => {
    try {
      const newAppointment = await AppointmentModel.create({
        student_id,
        tutor_id,
        date_time,
        duration,
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
      });
      console.log(appointments);
      return appointments;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Appointment;
