const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');

// Public route
router.post('/', contactController.createContactLead);

// Admin routes
router.get('/', verifyToken, verifyAdminRole, contactController.getAllContactLeads);
router.get('/:id', verifyToken, verifyAdminRole, contactController.getContactLeadById);
router.put('/:id', verifyToken, verifyAdminRole, contactController.updateContactLeadStatus);
router.delete('/:id', verifyToken, verifyAdminRole, contactController.deleteContactLead);

module.exports = router;

