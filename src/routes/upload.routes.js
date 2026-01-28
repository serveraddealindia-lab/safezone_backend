const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/upload.controller');
const { uploadImage, uploadPDF } = require('../config/multer.config');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// POST /api/v1/upload/image - Admin only
router.post('/image', verifyToken, verifyAdminRole, uploadImage.single('image'), handleMulterError, uploadController.uploadImage);

// POST /api/v1/upload/pdf - Admin only
router.post('/pdf', verifyToken, verifyAdminRole, uploadPDF.single('pdf'), handleMulterError, uploadController.uploadPDF);

module.exports = router;

