const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

// Define routes
router.post('/create', appointmentController.createAppointment);
router.get('/student', appointmentController.getByStudentId);

module.exports = router;