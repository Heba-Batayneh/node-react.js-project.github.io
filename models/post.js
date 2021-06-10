/**
 * Mongoose
 */
const mongoose = require('mongoose');

/**
 * Mongoose Schema
 */
const Schema = mongoose.Schema;

/**
 * Comment Schema
 */
const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

/**
 * Post Schema
 */
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        CommentSchema
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
});

/**
 * Post Model
 */
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;