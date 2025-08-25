const express = require('express');
const router = express.Router();
const {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getAllTeamMembersAdmin
} = require('../controllers/teamController');
const { auth, authorize } = require('../middleware/auth');
const { upload, processImage, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', getTeamMembers);
router.get('/:id', getTeamMember);

// Protected routes (Admin only)
router.get('/admin/all', auth, authorize('admin'), getAllTeamMembersAdmin);
router.post('/', auth, authorize('admin'), upload.single('avatar'), processImage, handleUploadError, createTeamMember);
router.put('/:id', auth, authorize('admin'), upload.single('avatar'), processImage, handleUploadError, updateTeamMember);
router.delete('/:id', auth, authorize('admin'), deleteTeamMember);

module.exports = router;