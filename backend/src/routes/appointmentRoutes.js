const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

// Define routes
router.post('/create', appointmentController.createAppointment); // not availiable at the moment
router.get('/get', appointmentController.getByToken); // not availiable at the moment
router.delete('/delete/:appt_id', appointmentController.deleteByApptId);

module.exports = router;
