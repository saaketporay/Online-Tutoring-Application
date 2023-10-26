const express = require('express');

const subjectController = require('../controllers/SubjectController');

const router = express.Router();

router.get('/subjects', subjectController.getAllSubjects);

module.exports = router;