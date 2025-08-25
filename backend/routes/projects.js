const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  getProjectCategories,
  createProject,
  updateProject,
  deleteProject,
  getAllProjectsAdmin
} = require('../controllers/projectController');
const { auth, authorize } = require('../middleware/auth');
const { upload, processImage, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', getProjects);
router.get('/categories', getProjectCategories);
router.get('/:slug', getProject);

// Protected routes (Admin only)
router.get('/admin/all', auth, authorize('admin'), getAllProjectsAdmin);
router.post('/', auth, authorize('admin'), upload.single('image'), processImage, handleUploadError, createProject);
router.put('/:id', auth, authorize('admin'), upload.single('image'), processImage, handleUploadError, updateProject);
router.delete('/:id', auth, authorize('admin'), deleteProject);

module.exports = router;