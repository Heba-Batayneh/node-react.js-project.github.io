/**
 * Http Errors
 */
const createError = require('http-errors');

/**
 * JsonWebToken
 */
const jwt = require('jsonwebtoken');

/**
 * User Model
 */
const User = require('../models/user');


/**
 * User Login
 */
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email, password: req.body.password})
    .then(user => {
        if(!user) throw createError(401, 'Incorrect email or password.');
        let data = {
            id: user._id,
            name: user.name,
            email: user.email
        };
        let token = jwt.sign(data, process.env.JWT_SECRET);
        // يرسل اي دي العميل عند التسجيل
        res.json({token: token, _id: user._id});
    })
    .catch(next);
};

/**
 * User Details
 */
//لارسال المعلومات للمستخدم 
exports.me = (req, res, next) => {
    res.json(req.user);
};