const express = require('express');
const router = express.Router();
const {
  login,
  getMe,
  verifyToken,
  changePassword
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/login', login);

// Protected routes
router.get('/me', auth, getMe);
router.post('/verify', auth, verifyToken);
router.put('/change-password', auth, changePassword);

module.exports = router;