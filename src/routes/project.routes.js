const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');

// Public routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.get('/country/:country', projectController.getProjectsByCountry);
router.get('/status/:status', projectController.getProjectsByStatus);
router.get('/category/:category', projectController.getProjectsByCategory);

// Admin routes (require authentication)
router.post('/', verifyToken, verifyAdminRole, projectController.createProject);
router.put('/:id', verifyToken, verifyAdminRole, projectController.updateProject);
router.delete('/:id', verifyToken, verifyAdminRole, projectController.deleteProject);

module.exports = router;