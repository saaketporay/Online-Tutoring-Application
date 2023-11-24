const upload = require('../utils/multer'); 

const uploadController = {

  uploadProfilePicture: async (req, res) => {
    upload.single('profile_picture')(req, res, function (error) {
      if (req.file) {
        return res.status(200).json({
          message: 'File uploaded successfully',
          filename: req.file.filename,
        });
      } else {
        return res.status(400).send('No file uploaded.');
      }
    });
  }
}


module.exports = uploadController;
