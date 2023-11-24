const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const uploadController = require('../controllers/UploadController');

router.post('/profile-picture', upload.single('profile_picture'), uploadController.uploadProfilePicture);

module.exports = router;
