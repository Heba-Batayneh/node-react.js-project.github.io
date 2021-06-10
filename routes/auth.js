const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
//للتأكد من انه زائر
router.post('/', authMiddleware.guest, controller.login);
// للتأكد من انه مستخدم مسجّل
router.get('/me', authMiddleware.authenticated ,controller.me);

module.exports = router;