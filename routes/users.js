/**
 * Express Module
 */
const express = require('express');

/**
 * Express Router
 */
const router = express.Router();

/**
 * User Controller
 */
const controller = require('../controllers/userController')

/**
 * Create User
 */
//في حال تسجيل مستخدمين
router.post('/', controller.create);

/**
 * Users List
 */
//في حال اردنا ارجاع بيانات المستخدمين جميعهم في مصفوفه 
router.get('/', controller.list);

/**
 * Show User
 */
//في حال اردت ارجاع بيانات مستخدم واحد فقط 
router.get('/:id', controller.show);

/**
 * Update User
 */
//في حال اجراء تعديل 
router.put('/:id', controller.update);

/**
 * Delete User
 */
//في حال حذف مستخدم 
router.delete('/:id', controller.delete);

module.exports = router;
