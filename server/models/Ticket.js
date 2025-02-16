const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a ticket title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  imageUrl: {
    type: String
  },
  property: {
    type: mongoose.Schema.ObjectId,
    ref: 'Property',
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'inProgress', 'completed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',    // Changed from 'User' to 'user'
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'     // Changed from 'User' to 'user'
  },
  comments: [{
    text: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',  // Changed from 'User' to 'user'
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);