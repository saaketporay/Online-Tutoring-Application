// route to handel user auth

const express = require('express');

const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/verify-totp', userController.verifyTOTP);


module.exports = router;
