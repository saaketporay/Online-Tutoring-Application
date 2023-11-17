const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { uploadProfilePicture } = require('../controllers/UploadController');

router.post('/profile-picture', upload.single('profile_picture'), uploadProfilePicture);

module.exports = router;
