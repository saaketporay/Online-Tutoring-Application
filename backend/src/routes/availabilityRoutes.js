const express = require('express');
const router = express.Router();
const AvailabilityController = require('../controllers/AvailabilityController');

router.get('/:tutor_Id', AvailabilityController.getAvailabilityByTutorId);

module.exports = router;