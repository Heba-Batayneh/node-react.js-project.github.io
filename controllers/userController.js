/**
 * User Model
 */
const User = require('../models/user');

/**
 * Http Errors
 */
const createError = require('http-errors');

/**
 * Create User
 */
exports.create = (req, res, next) => {
    //تحتوي البيانات المرسله من قبل العميل 
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
        // في حال عدم وجود اخطاء يتم تنفيذه
        .then(user => {
            res.json(user);
        })
        //في حال وجود اخطاء 
        .catch(next);
};

/**
 * Users List
 */
//في حال اردنا ارجاع بيانات المستخدمين جميعهم في مصفوفه 
exports.list = (req, res, next) => {
    User.find()
        // في حال عدم وجود اخطاء يتم تنفيذه
        .then(users => {
            res.json(users);
        })
        //في حال وجود اخطاء 
        .catch(next);
};

/**
 * Show User
 */
//في حال اردت ارجاع بيانات مستخدم واحد فقط 
exports.show = (req, res, next) => {
    User.findById(req.params.id)
        // في حال عدم وجود اخطاء يتم تنفيذه
        .then(user => {
            if (!user) throw createError(404, "User not found.");
            res.json(user);
        })

        //في حال اردت ارجاع شخص بشروط معينه كالبريد الالكتروني هذا مثلا نستخم findOne

        //في حال وجود اخطاء 
        .catch(next);
};

/**
 * Update User
 */
//في حال اجراء تعديل 
exports.update = (req, res, next) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    User.findByIdAndUpdate(req.params.id, data)
        .then(updatedUser => {
            if (!updatedUser) throw createError(404, "User not found.");
            res.json();
        })
        .catch(next);
};

/**
 * Delete User
 */
//في حال حذف مستخدم 
exports.delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
        .then(deleted => {
            if (!deleted) throw createError(404, "User not found.");
            res.json({ message: "User deleted" });
        })
        .catch(next);
};
