const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPost,
  getBlogCategories,
  getBlogTags,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllBlogPostsAdmin,
  getBlogStats
} = require('../controllers/blogController');
const { auth, authorize } = require('../middleware/auth');
const { upload, processImage, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', getBlogPosts);
router.get('/categories', getBlogCategories);
router.get('/tags', getBlogTags);
router.get('/:slug', getBlogPost);

// Protected routes (Admin only)
router.get('/admin/all', auth, authorize('admin'), getAllBlogPostsAdmin);
router.get('/admin/stats', auth, authorize('admin'), getBlogStats);
router.post('/', auth, authorize('admin'), upload.single('featuredImage'), processImage, handleUploadError, createBlogPost);
router.put('/:id', auth, authorize('admin'), upload.single('featuredImage'), processImage, handleUploadError, updateBlogPost);
router.delete('/:id', auth, authorize('admin'), deleteBlogPost);

module.exports = router;