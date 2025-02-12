const Property = require('../models/Property');
const { cloudinary } = require('../config/cloudinary');

// New function for image upload
exports.uploadPropertyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a file'
      });
    }

    const property = await Property.findById(req.params.id);
    
    if (!property) {
      // Delete uploaded file if property doesn't exist
      await cloudinary.uploader.destroy(req.file.filename);
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // Have to make sure user owns property
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      await cloudinary.uploader.destroy(req.file.filename);
      return res.status(401).json({
        success: false,
        error: 'Not authorized to upload image for this property'
      });
    }

    // If property already has an image, delete it (except default image)
    if (property.imageUrl && property.imageUrl !== 'no-photo.jpg') {
      const publicId = property.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Update property with new image URL
    property.imageUrl = req.file.path;
    await property.save();

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Utility function to delete property image
const deletePropertyImage = async (imageUrl) => {
  if (imageUrl && imageUrl !== 'no-photo.jpg') {
    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  }
};

// Updated existing deleteProperty function to handle image deletion
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // Have to Make sure user owns property
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this property'
      });
    }

    // Delete property image from Cloudinary
    await deletePropertyImage(property.imageUrl);

    // Delete property
    await property.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};