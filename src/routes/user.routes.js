const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Admin routes for user management
router.get('/', authMiddleware.verifyToken, authMiddleware.verifyAdminRole, userController.getAllUsers);
router.get('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdminRole, userController.getUserById);
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyAdminRole, userController.createUser);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdminRole, userController.updateUser);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdminRole, userController.deleteUser);

module.exports = router;