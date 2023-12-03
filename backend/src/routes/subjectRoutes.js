const express = require('express');

const subjectController = require('../controllers/SubjectController');

const router = express.Router();

router.get('/all', subjectController.getAllSubjects);
router.get('/:tutor_id', subjectController.getByTutorId)

module.exports = router;