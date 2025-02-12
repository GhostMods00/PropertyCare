const path = require('path');

const fileFilter = (req, file, cb) => {
  // Allowed file types
  const filetypes = /jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only! (jpeg, jpg, png)'));
  }
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size is too large. Max limit is 5MB'
      });
    }
  }
  if (error.message === 'Error: Images Only! (jpeg, jpg, png)') {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
  next(error);
};

module.exports = { fileFilter, errorHandler };