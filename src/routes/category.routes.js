const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin only routes
router.post('/', verifyToken, verifyAdminRole, categoryController.createCategory);
router.put('/:id', verifyToken, verifyAdminRole, categoryController.updateCategory);
router.delete('/:id', verifyToken, verifyAdminRole, categoryController.deleteCategory);

module.exports = router;

