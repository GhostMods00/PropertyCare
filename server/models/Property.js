const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a property name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  imageUrl: {
    type: String,
    default: 'no-photo.jpg'
  },
  type: {
    type: String,
    required: [true, 'Please add property type'],
    enum: {
      values: ['residential', 'commercial'],
      message: '{VALUE} is not a valid property type'
    }
  },
  size: {
    type: Number,
    required: [true, 'Please add property size'],
    min: [1, 'Size must be greater than 0']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please add a street address'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please add a state'],
      trim: true,
      uppercase: true,
      minlength: [2, 'State abbreviation should be 2 characters'],
      maxlength: [4, 'State abbreviation should be 2 characters']
    },
    zipCode: {
      type: String,
      required: [true, 'Please add a zip code'],
      trim: true,
      // match: [/^\d{1}(-\d{4})?$/, 'Please enter a valid zip code']
    }
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,  // Adds createdAt and updatedAt timestamps
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add any needed indexes
propertySchema.index({ owner: 1, name: 1 });

// Virtual for full address
propertySchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
});

// Virtual populate for maintenance tickets
propertySchema.virtual('tickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'property',
  justOne: false
});

module.exports = mongoose.model('Property', propertySchema);