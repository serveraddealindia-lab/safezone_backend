const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');
const { uploadImage } = require('../config/multer.config');

// Configure multer for datasheet uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/datasheets/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'datasheet-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept PDF files only
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed')); 
    }
  }
});

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin only routes
router.post('/', verifyToken, verifyAdminRole, uploadImage.single('image'), productController.createProduct);
router.put('/:id', verifyToken, verifyAdminRole, uploadImage.single('image'), productController.updateProduct);
router.delete('/:id', verifyToken, verifyAdminRole, productController.deleteProduct);
router.post('/:id/datasheet', verifyToken, verifyAdminRole, upload.single('datasheet'), productController.uploadDatasheet);

module.exports = router;

