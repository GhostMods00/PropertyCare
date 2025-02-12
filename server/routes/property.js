const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

// routes are properly defined with their controller functions
router.route('/')
  .get(protect, getProperties)
  .post(protect, authorize('manager'), upload.single('image'), createProperty);

router.route('/:id')
  .get(protect, getProperty)
  .put(protect, authorize('manager'), upload.single('image'), updateProperty)
  .delete(protect, authorize('manager'), deleteProperty);

module.exports = router;