// route to handel user auth

const express = require('express');

const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/getUser', userController.getAllUserInfo);

module.exports = router;
