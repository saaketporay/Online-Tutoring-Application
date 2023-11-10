const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

// Define routes
router.post('/create', appointmentController.createAppointment); // not availiable at the moment
router.get('/:token', appointmentController.getByToken); // not availiable at the moment

module.exports = router;
