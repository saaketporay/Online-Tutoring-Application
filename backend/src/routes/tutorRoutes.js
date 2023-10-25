const express = require('express');
const router = express.Router();
const { signUpTutor, login } = require('../controllers/TutorController');

router.post('/signup', signUpTutor);
router.post('/login', login); 

module.exports = router;
