/**
 * JsonWebToken
 */
const jwt = require('jsonwebtoken');

/**
 * Http Errors
 */
const createError = require('http-errors');

/**
 * Authenticated Middleware
 */
//طبقة للتأكد من ان المستخدم مسجل 
exports.authenticated = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) throw createError(401);
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email
        };
        next();
    });
};

/**
 * Guest Middleware
 */

// طبقة للتأكد من ان المستخدم ليس مسجّل
exports.guest = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // اذا كان ليس مسجل (زائر) ينتقل للطبقة الاخرى
        if (err) return next();
        // في حال كان مستخدم يظهر الخطأ التالي 
        throw createError(403);
    });
};
