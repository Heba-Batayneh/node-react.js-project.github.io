/**
 * Mongoose
 */
const mongoose = require('mongoose');

/**
 * Mongoose Schema
 */
const Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

/**
 * User Model
 */
const User = mongoose.model('User', UserSchema);

module.exports = User;