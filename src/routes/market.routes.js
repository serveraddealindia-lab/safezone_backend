const express = require('express');
const router = express.Router();
const marketController = require('../controllers/market.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');
const { uploadImage } = require('../config/multer.config');

// Public routes
router.get('/', marketController.getAllMarkets);
router.get('/:id', marketController.getMarketById);

// Admin only routes
router.post('/', verifyToken, verifyAdminRole, uploadImage.single('image'), marketController.createMarket);
router.put('/:id', verifyToken, verifyAdminRole, uploadImage.single('image'), marketController.updateMarket);
router.delete('/:id', verifyToken, verifyAdminRole, marketController.deleteMarket);

module.exports = router;

