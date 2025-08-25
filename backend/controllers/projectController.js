const Project = require('../models/Project');

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
const getProjects = async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = { isActive: true };
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const projects = await Project.find(query)
      .sort({ order: 1, projectDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting projects'
    });
  }
};

/**
 * @desc    Get single project
 * @route   GET /api/projects/:slug
 * @access  Public
 */
const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting project'
    });
  }
};

/**
 * @desc    Get project categories
 * @route   GET /api/projects/categories
 * @access  Public
 */
const getProjectCategories = async (req, res) => {
  try {
    const categories = await Project.distinct('category', { isActive: true });
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get project categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting project categories'
    });
  }
};

/**
 * @desc    Create project
 * @route   POST /api/projects
 * @access  Private (Admin)
 */
const createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      fullDescription,
      technologies,
      demoUrl,
      githubUrl,
      client,
      projectDate,
      featured,
      order
    } = req.body;

    // Validate required fields
    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, and description'
      });
    }

    const projectData = {
      title,
      category,
      description,
      fullDescription,
      technologies: Array.isArray(technologies) ? technologies : [],
      demoUrl,
      githubUrl,
      client,
      projectDate: projectDate || new Date(),
      featured: featured === true,
      order: order || 0,
      images: []
    };

    // Add primary image if uploaded
    if (req.processedFile) {
      projectData.images.push({
        url: req.processedFile.url,
        alt: title,
        isPrimary: true
      });
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating project'
    });
  }
};

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private (Admin)
 */
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const updateData = { ...req.body };

    // Ensure technologies is an array
    if (updateData.technologies && !Array.isArray(updateData.technologies)) {
      updateData.technologies = [];
    }

    // Handle new primary image
    if (req.processedFile) {
      // Mark existing primary images as non-primary
      if (updateData.images) {
        updateData.images = updateData.images.map(img => ({
          ...img,
          isPrimary: false
        }));
      } else {
        updateData.images = project.images.map(img => ({
          ...img,
          isPrimary: false
        }));
      }

      // Add new primary image
      updateData.images.push({
        url: req.processedFile.url,
        alt: updateData.title || project.title,
        isPrimary: true
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating project'
    });
  }
};

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private (Admin)
 */
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Soft delete by setting isActive to false
    await Project.findByIdAndUpdate(
      req.params.id,
      { isActive: false }
    );

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting project'
    });
  }
};

/**
 * @desc    Get all projects for admin
 * @route   GET /api/projects/admin/all
 * @access  Private (Admin)
 */
const getAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await Project.find({})
      .sort({ order: 1, projectDate: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Get all projects admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting projects'
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  getProjectCategories,
  createProject,
  updateProject,
  deleteProject,
  getAllProjectsAdmin
};