const TeamMember = require('../models/TeamMember');

/**
 * @desc    Get all team members
 * @route   GET /api/team
 * @access  Public
 */
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting team members'
    });
  }
};

/**
 * @desc    Get single team member
 * @route   GET /api/team/:id
 * @access  Public
 */
const getTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findOne({
      _id: req.params.id,
      isActive: true
    });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    console.error('Get team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting team member'
    });
  }
};

/**
 * @desc    Create team member
 * @route   POST /api/team
 * @access  Private (Admin)
 */
const createTeamMember = async (req, res) => {
  try {
    const {
      name,
      role,
      skills,
      experience,
      bio,
      social,
      order
    } = req.body;

    // Validate required fields
    if (!name || !role || !experience) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, role, and experience'
      });
    }

    const teamMemberData = {
      name,
      role,
      skills: Array.isArray(skills) ? skills : [],
      experience,
      bio,
      social: social || {},
      order: order || 0
    };

    // Add avatar if uploaded
    if (req.processedFile) {
      teamMemberData.avatar = req.processedFile.url;
    }

    const teamMember = await TeamMember.create(teamMemberData);

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: teamMember
    });
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating team member'
    });
  }
};

/**
 * @desc    Update team member
 * @route   PUT /api/team/:id
 * @access  Private (Admin)
 */
const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    const updateData = { ...req.body };

    // Add new avatar if uploaded
    if (req.processedFile) {
      updateData.avatar = req.processedFile.url;
    }

    // Ensure skills is an array
    if (updateData.skills && !Array.isArray(updateData.skills)) {
      updateData.skills = [];
    }

    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedTeamMember
    });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating team member'
    });
  }
};

/**
 * @desc    Delete team member
 * @route   DELETE /api/team/:id
 * @access  Private (Admin)
 */
const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Soft delete by setting isActive to false
    await TeamMember.findByIdAndUpdate(
      req.params.id,
      { isActive: false }
    );

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting team member'
    });
  }
};

/**
 * @desc    Get all team members for admin
 * @route   GET /api/team/admin/all
 * @access  Private (Admin)
 */
const getAllTeamMembersAdmin = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({})
      .sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    console.error('Get all team members admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting team members'
    });
  }
};

module.exports = {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getAllTeamMembersAdmin
};