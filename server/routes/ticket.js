const express = require('express');
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  addComment
} = require('../controllers/ticketController');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getTickets)
  .post(protect, createTicket);

router
  .route('/:id')
  .get(protect, getTicket)
  .put(protect, updateTicket);

router
  .route('/:id/comments')
  .post(protect, addComment);

module.exports = router;