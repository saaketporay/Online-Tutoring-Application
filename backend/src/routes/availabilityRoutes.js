const express = require('express');
const router = express.Router();
const AvailabilityController = require('../controllers/AvailabilityController');

router.get('/subjects', AvailabilityController.getAllSubjects);
router.get('/tutors', AvailabilityController.getAllTutors);
router.get('/all', AvailabilityController.getAllAvailabilityInfo);
router.get('/:tutor_Id', AvailabilityController.getAllTimesByTutorId);

module.exports = router;
