const express = require('express');
const router = express.Router();
const controller = require('../controllers/service.controller');
const { verifyToken, verifyAdminRole } = require('../middleware/auth.middleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', verifyToken, verifyAdminRole, controller.create);
router.put('/:id', verifyToken, verifyAdminRole, controller.update);
router.delete('/:id', verifyToken, verifyAdminRole, controller.delete);

module.exports = router;
