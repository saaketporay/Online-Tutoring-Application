const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController');

router.delete('/:tutor_id', TestController.deleteTutorByTutorId);

module.exports = router;
