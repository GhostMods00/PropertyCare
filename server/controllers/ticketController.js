const Ticket = require('../models/Ticket');
const Property = require('../models/Property');
const User = require('../models/User');
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
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to fetch tickets'
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

    // Verify authorization
    if (req.user.role === 'staff' && ticket.assignedTo?.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view this ticket'
      });
    }

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to fetch ticket'
    });
  }
};

// @desc    Create ticket
// @route   POST /api/tickets
// @access  Private
exports.createTicket = async (req, res) => {
  try {
    const { property: propertyId, assignedTo: staffId } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    // If assigning to staff, verify staff exists and is active
    if (staffId) {
      const staff = await User.findOne({ _id: staffId, role: 'staff', status: 'active' });
      if (!staff) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or inactive staff member'
        });
      }
    }

    // Create ticket
    const ticket = await Ticket.create({
      ...req.body,
      createdBy: req.user.id
    });

    // Handle image upload
    if (req.file) {
      ticket.imageUrl = req.file.path;
      await ticket.save();
    }

    // Populate ticket data
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('property', 'name address')
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name');

    res.status(201).json({
      success: true,
      data: populatedTicket
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create ticket'
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
    if (req.user.role !== 'manager' && ticket.assignedTo?.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this ticket'
      });
    }

    // If staff, only allow status updates
    if (req.user.role === 'staff') {
      if (Object.keys(req.body).some(key => key !== 'status')) {
        return res.status(403).json({
          success: false,
          error: 'Staff can only update ticket status'
        });
      }
    }

    // Handle image upload
    if (req.file) {
      if (ticket.imageUrl) {
        try {
          const publicId = ticket.imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      req.body.imageUrl = req.file.path;
    }

    // Update ticket
    ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        updatedAt: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('property', 'name address')
     .populate('createdBy', 'name')
     .populate('assignedTo', 'name');

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update ticket'
    });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private/Manager
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
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete tickets'
      });
    }

    // Delete image if exists
    if (ticket.imageUrl) {
      try {
        const publicId = ticket.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    await ticket.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to delete ticket'
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

    // Verify authorization
    if (req.user.role === 'staff' && ticket.assignedTo?.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to comment on this ticket'
      });
    }

    const comment = {
      text: req.body.text,
      createdBy: req.user.id
    };

    ticket.comments.push(comment);
    await ticket.save();

    // Return populated ticket
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('property', 'name address')
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name')
      .populate('comments.createdBy', 'name');

    res.status(200).json({
      success: true,
      data: populatedTicket
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to add comment'
    });
  }
};