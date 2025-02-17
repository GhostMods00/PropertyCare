const Property = require('../models/Property');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Private
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Private
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // Make sure user owns property
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this property'
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private
exports.createProperty = async (req, res) => {
  try {
    // Log incoming request data
    console.log('Creating property with data:', {
      body: req.body,
      file: req.file,
      user: req.user.id
    });

    // Add user to req.body
    req.body.owner = req.user.id;

    // Handle address if it's a string
    if (typeof req.body.address === 'string') {
      try {
        req.body.address = JSON.parse(req.body.address);
      } catch (parseError) {
        console.error('Address parsing error:', parseError);
        return res.status(400).json({
          success: false,
          error: 'Invalid address format'
        });
      }
    }

    // Validate required fields
    if (!req.body.name || !req.body.type || !req.body.size) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, type, and size'
      });
    }

    // Create property
    const property = await Property.create(req.body);
    console.log('Property created:', property);

    // Handle image upload
    if (req.file) {
      console.log('Processing image upload:', req.file);
      property.imageUrl = req.file.path;
      await property.save();
    }

    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Property creation error:', {
      message: error.message,
      stack: error.stack,
      body: req.body
    });

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate property name'
      });
    }

    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create property'
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
exports.updateProperty = async (req, res) => {
  try {
    console.log('Updating property:', {
      id: req.params.id,
      updates: req.body,
      file: req.file
    });

    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // Make sure user owns property
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this property'
      });
    }

    // Handle image upload
    if (req.file) {
      console.log('Processing new image upload');
      // Delete old image if exists
      if (property.imageUrl && property.imageUrl !== 'no-photo.jpg') {
        const publicId = property.imageUrl.split('/').pop().split('.')[0];
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log('Old image deleted successfully');
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
        }
      }
      req.body.imageUrl = req.file.path;
    }

    // Handle address if it's a string
    if (typeof req.body.address === 'string') {
      try {
        req.body.address = JSON.parse(req.body.address);
      } catch (parseError) {
        console.error('Address parsing error:', parseError);
        return res.status(400).json({
          success: false,
          error: 'Invalid address format'
        });
      }
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    console.log('Property updated successfully:', property);

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Property update error:', {
      message: error.message,
      stack: error.stack
    });
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update property'
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
exports.deleteProperty = async (req, res) => {
  try {
    console.log('Attempting to delete property:', req.params.id);

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // Make sure user owns property
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this property'
      });
    }

    // Delete image from cloudinary if exists
    if (property.imageUrl && property.imageUrl !== 'no-photo.jpg') {
      const publicId = property.imageUrl.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log('Property image deleted from Cloudinary');
      } catch (deleteError) {
        console.error('Error deleting image from Cloudinary:', deleteError);
      }
    }

    await property.deleteOne();
    console.log('Property deleted successfully');

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Property deletion error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to delete property'
    });
  }
};