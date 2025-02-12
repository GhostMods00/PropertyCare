const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

// Get maintenance staff
router.get('/maintenance-staff', protect, async (req, res) => {
  try {
    const maintenanceStaff = await User.find({ role: 'staff' }).select('name');
    res.status(200).json({
      success: true,
      data: maintenanceStaff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching maintenance staff'
    });
  }
});

module.exports = router;