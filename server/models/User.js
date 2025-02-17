const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true, // Convert email to lowercase
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: {
      values: ['manager', 'staff'],
      message: '{VALUE} is not a valid role'
    },
    default: 'manager'
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please enter a valid phone number']
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  assignedProperties: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Property'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create index for email
userSchema.index({ email: 1 });

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Update lastLogin timestamp
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = Date.now();
  return this.save();
};

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      role: this.role,
      name: this.name 
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '30d'
    }
  );
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Virtual for assigned tickets
userSchema.virtual('assignedTickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'assignedTo',
  justOne: false
});

// Cascade delete tickets when a staff user is deleted
userSchema.pre('remove', async function(next) {
  if (this.role === 'staff') {
    await this.model('Ticket').deleteMany({ assignedTo: this._id });
  }
  next();
});

// Method to check if user is active
userSchema.methods.isActive = function() {
  return this.status === 'active';
};

// Static method to get all maintenance staff
userSchema.statics.getMaintenanceStaff = function() {
  return this.find({ 
    role: 'staff',
    status: 'active'
  }).select('name email phone');
};

module.exports = mongoose.model('user', userSchema);