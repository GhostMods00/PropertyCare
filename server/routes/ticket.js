const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  addComment,
} = require('../controllers/ticketController');

router.route('/')
  .get(protect, getTickets)
  .post(protect, upload.single('image'), createTicket);

router.route('/:id')
  .get(protect, getTicket)
  .put(protect, upload.single('image'), updateTicket)
  .delete(protect, deleteTicket);

router.route('/:id/comments')
  .post(protect, addComment);

module.exports = router;