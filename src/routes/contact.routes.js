const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');

router.post('/', controller.submit);
router.get('/', verifyToken, verifyAdminRole, controller.getAll);
router.get('/:id', verifyToken, verifyAdminRole, controller.getOne);
router.put('/:id', verifyToken, verifyAdminRole, controller.update);
router.delete('/:id', verifyToken, verifyAdminRole, controller.delete);

module.exports = router;
