const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');

router.post('/image', verifyToken, verifyAdminRole, uploadController.uploadImage);
router.post('/pdf', verifyToken, verifyAdminRole, uploadController.uploadPdf);

module.exports = router;
