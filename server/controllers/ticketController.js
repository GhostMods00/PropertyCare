const Ticket = require('../models/Ticket');
const Property = require('../models/Property');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
exports.getTickets = async (req, res) => {
  try {
    let query;

    // If staff, only show assigned tickets
    if (req.user.role === 'staff') {
      query = Ticket.find({ assignedTo: req.user.id });
    } else {
      // If manager, show all tickets for their properties
      const properties = await Property.find({ owner: req.user.id });
      const propertyIds = properties.map(prop => prop._id);
      query = Ticket.find({ property: { $in: propertyIds } });
    }

    const tickets = await query
      .populate('property', 'name address')
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name');

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('property', 'name address')
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')
      .populate('comments.createdBy', 'name');

    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      });
    }

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create ticket
// @route   POST /api/tickets
// @access  Private
exports.createTicket = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;

    // Check if property exists
    const property = await Property.findById(req.body.property);
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    const ticket = await Ticket.create(req.body);

    // Handle image upload
    if (req.file) {
      ticket.imageUrl = req.file.path;
      await ticket.save();
    }

    res.status(201).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
exports.updateTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      });
    }

    // Check authorization
    if (req.user.role !== 'manager' && 
        ticket.assignedTo?.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this ticket'
      });
    }

    // Handle image upload
    if (req.file) {
      // Delete old image if exists
      if (ticket.imageUrl) {
        const publicId = ticket.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      req.body.imageUrl = req.file.path;
    }

    ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      });
    }

    // Check authorization
    if (req.user.role !== 'manager') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete tickets'
      });
    }

    // Delete image if exists
    if (ticket.imageUrl) {
      const publicId = ticket.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await ticket.deleteOne();

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

// @desc    Add comment to ticket
// @route   POST /api/tickets/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      });
    }

    const comment = {
      text: req.body.text,
      createdBy: req.user.id
    };

    ticket.comments.push(comment);
    await ticket.save();

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};