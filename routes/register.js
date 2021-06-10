/**
 * Express Module
 */
const express = require('express');

/**
 * Express Router
 */
const router = express.Router();

/**
 * Register Controller
 */
const controller = require('../controllers/registerController');

/**
 * Authentication Middleware
 */
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Create new account
 */
// في حال كان زائر 
router.post('/', authMiddleware.guest, controller.register);

module.exports = router;