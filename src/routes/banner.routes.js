const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');
const { uploadImage } = require('../config/multer.config');

// Public routes
router.get('/', bannerController.getAllBanners);
router.get('/:id', bannerController.getBannerById);

// Admin only routes
router.post('/', verifyToken, verifyAdminRole, uploadImage.single('image'), bannerController.createBanner);
router.put('/:id', verifyToken, verifyAdminRole, uploadImage.single('image'), bannerController.updateBanner);
router.delete('/:id', verifyToken, verifyAdminRole, bannerController.deleteBanner);

module.exports = router;

