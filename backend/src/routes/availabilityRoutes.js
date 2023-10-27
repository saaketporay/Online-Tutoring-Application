const express = require('express');
const router = express.Router();
const AvailabilityController = require('../controllers/AvailabilityController');

router.get('/:tutor_Id', AvailabilityController.getTimesByTutorId);
router.get('/subjects', AvailabilityController.getAllSubjects);
router.get('/tutors', AvailabilityController.getAllTutors);
router.get('/all', AvailabilityController.getAllAvailabilityInfo);

module.exports = router;
