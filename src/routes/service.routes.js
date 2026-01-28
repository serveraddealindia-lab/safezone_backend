const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');
const { uploadImage } = require('../config/multer.config');

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// Admin only routes
router.post('/', verifyToken, verifyAdminRole, uploadImage.single('image'), serviceController.createService);
router.put('/:id', verifyToken, verifyAdminRole, uploadImage.single('image'), serviceController.updateService);
router.delete('/:id', verifyToken, verifyAdminRole, serviceController.deleteService);

module.exports = router;

