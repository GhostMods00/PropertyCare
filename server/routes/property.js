const express = require('express');
const router = express.Router();
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getProperties)
  .post(protect, authorize('manager', 'admin'), createProperty);

router
  .route('/:id')
  .get(protect, getProperty)
  .put(protect, authorize('manager', 'admin'), updateProperty)
  .delete(protect, authorize('manager', 'admin'), deleteProperty);

module.exports = router;