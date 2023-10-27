const Appointment = require('../models/Appointment');
const decodeToken = require('../utils/jwtUtil');

const appointmentController = {
    createAppointment: async (req, res) => {
        const decodedToken = decodeToken(req.headers.authorization);
        const student_Id = decodedToken.id;
        const {tutor_Id, date_time, duration} = req.body;
        console.log(tutor_Id);

        try
        {
            const appointment_id = await Appointment.create(student_Id, tutor_Id, date_time, duration);
            console.log(appointment_id);
            return res.status(200).json(appointment_id);
        }
        catch (err)
        {
            return res.status(500).send("Internal Server Error");
        }
    },

    getByStudentId: async (req, res) => {
        const decodedToken = decodeToken(req.headers.authorization);
        console.log(decodedToken);
        const student_Id = decodedToken.id;
        console.log(student_Id);

        try 
        {
            const appointments = await Appointment.getByStudentId(student_Id);
            return res.status(200).json(appointments[0]);
        }
        catch (err)
        {
            return res.status(500).send(err);
        }
    }
}

module.exports = appointmentController;
