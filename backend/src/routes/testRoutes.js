const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController');

router.delete('/:user_id', TestController.deleteUserById);

module.exports = router;
