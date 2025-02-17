const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant
} = require('../controllers/tenantController');

router.route('/')
  .get(protect, authorize('manager'), getTenants)
  .post(protect, authorize('manager'), createTenant);

router.route('/:id')
  .get(protect, authorize('manager'), getTenant)
  .put(protect, authorize('manager'), updateTenant)
  .delete(protect, authorize('manager'), deleteTenant);

module.exports = router;