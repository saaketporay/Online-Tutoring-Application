const multer = require('multer');
const path = require('path');

// Set up the storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); 
  },
  filename: (req, file, cb) => {
    // Extract the user's first and last name from the request body
    const userFirstName = req.body.first_name;
    const userLastName = req.body.last_name;
    // Create a file name based on the user's name and the original file extension
    const fileExtension = path.extname(file.originalname);
    const newFilename = `${userFirstName}_${userLastName}${fileExtension}`;
    cb(null, newFilename);
  }
});

// Initialize multer with the storage engine
const upload = multer({ storage: storage }).single('profile_picture');

exports.uploadProfilePicture = (req, res) => {
  upload(req, res, function (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      filePath: req.file.path    
    });
  });
};
