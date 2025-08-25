const express = require('express');
const router = express.Router();
const {
  sendContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
  getContactStats
} = require('../controllers/contactController');
const { auth, authorize } = require('../middleware/auth');

// Public routes
router.post('/send', sendContactMessage);

// Protected routes (Admin only)
router.get('/messages', auth, authorize('admin'), getContactMessages);
router.get('/stats', auth, authorize('admin'), getContactStats);
router.put('/messages/:id/read', auth, authorize('admin'), markMessageAsRead);
router.delete('/messages/:id', auth, authorize('admin'), deleteContactMessage);

module.exports = router;