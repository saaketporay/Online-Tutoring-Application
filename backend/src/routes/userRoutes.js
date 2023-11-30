// route to handel user auth

const express = require('express');

const userController = require('../controllers/UserController');
const upload = require('../utils/multer');

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/info', userController.getUserInfo);
router.get('/tutorInfo', userController.getTutorInfo);

module.exports = router;
