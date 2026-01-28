const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');

// POST /api/v1/auth/login - Public route
router.post('/login', authController.login);

// POST /api/v1/auth/register - Temporarily public for testing
router.post('/register', authController.register);

module.exports = router;

