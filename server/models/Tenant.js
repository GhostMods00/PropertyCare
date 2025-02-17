const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  property: {
    type: mongoose.Schema.ObjectId,
    ref: 'Property',
    required: true
  },
  unit: {
    type: String,
    required: [true, 'Please add a unit number']
  },
  leaseStart: {
    type: Date,
    required: [true, 'Please add lease start date']
  },
  leaseEnd: {
    type: Date,
    required: [true, 'Please add lease end date']
  },
  rentAmount: {
    type: Number,
    required: [true, 'Please add rent amount']
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'inactive'],
    default: 'active'
  },
  emergencyContact: {
    name: {
      type: String,
      required: [true, 'Please add emergency contact name']
    },
    phone: {
      type: String,
      required: [true, 'Please add emergency contact phone']
    },
    relationship: {
      type: String,
      required: [true, 'Please add emergency contact relationship']
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('tenant', tenantSchema);