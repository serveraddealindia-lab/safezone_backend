const express = require('express');
const router = express.Router();
const careerController = require('../controllers/career.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');
const { uploadImage } = require('../config/multer.config');

// Public routes
router.get('/', careerController.getAllCareers);
router.get('/:id', careerController.getCareerById);

// Admin routes
router.post('/', verifyToken, verifyAdminRole, uploadImage.single('image'), careerController.createCareer);
router.put('/:id', verifyToken, verifyAdminRole, uploadImage.single('image'), careerController.updateCareer);
router.delete('/:id', verifyToken, verifyAdminRole, careerController.deleteCareer);

module.exports = router;

