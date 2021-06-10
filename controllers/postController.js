/**
 * Post Model
 */
const Post = require('../models/post');

/**
 * Http Errors
 */
const createError = require('http-errors');

/**
 * Create Post
 */
// انشاء بوست
exports.create = (req, res, next) => {
    let model = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id
    });
    model.save()
        .then(post => {
            res.json();
        })
        .catch(next);
};

/**
 * Posts List
 */

//جلب كل البوستات 
exports.list = (req, res, next) => {
    Post.find()
        // يجلب عنوان التدوينه ومحتوياتها ولا يجلب التعليقات (هاد معنى السالب)
        .select('-comments')
        //يرتبها حسب تاريخ النشر 
        .sort({ created_at: 'desc' })
        .populate('author', 'name')
        .then(posts => {
            res.json(posts);
        })
        .catch(next);
};

/**
 * Post Details
 */
//جلب تفاصيل التدوينه 
exports.details = (req, res, next) => {
    let postId = req.params.id;
    Post.findById(postId)
        // جلب اسم كاتب التدوينة 
        .populate('author', 'name')
        //جلب بيانات كاتب التعليق
        .populate('comments.author', 'name')
        .then(post => {
            if (!post) throw createError(404);
            res.json(post);
        })
        .catch(next);
};

/**
 * Update Post
 */
//للتعديل على التدوينات 
exports.update = (req, res, next) => {
    let postId = req.params.id;
    let data = {
        title: req.body.title,
        content: req.body.content
    };
    // للتحقق من البيانات بشكل تلقائي runValidators
    Post.findOneAndUpdate({ _id: postId, author: req.user.id }, data, { runValidators: true })
        .then(post => {
            if (!post) throw createError(404);
            res.json();
        })
        .catch(next);
};

/**
 * Delete Post
 */
//لحذف التدوينه 
exports.delete = (req, res, next) => {
    let postId = req.params.id;
    Post.findOneAndDelete({ _id: postId, author: req.user.id })
        .then(post => {
            if (!post) throw createError(404);
            res.json();
        })
        .catch(next);
};