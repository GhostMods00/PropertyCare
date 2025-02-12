const express = require('express');
const router = express.Router();
const cloudinaryConfig = require('../config/cloudinary');
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyImage
} = require('../controllers/propertyController');

const { protect, authorize } = require('../middleware/auth');

// Basic routes
router
  .route('/')
  .get(protect, getProperties)
  .post(protect, authorize('manager', 'admin'), createProperty);

router
  .route('/:id')
  .get(protect, getProperty)
  .put(protect, authorize('manager', 'admin'), updateProperty)
  .delete(protect, authorize('manager', 'admin'), deleteProperty);

// Image upload route
router.post(
  '/:id/image',
  protect,
  authorize('manager', 'admin'),
  cloudinaryConfig.upload.single('image'),
  uploadPropertyImage
);

module.exports = router;