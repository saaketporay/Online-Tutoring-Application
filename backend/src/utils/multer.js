
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {

    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function(req, file, cb) {
    // Generate a unique filename with the original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// Initialize Multer with the storage engine
const upload = multer({ storage: storage });

module.exports = upload;
