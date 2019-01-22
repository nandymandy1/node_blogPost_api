const mongoose = require('mongoose');
const config = require('../config/db').database;

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    udated_at: {
        type: Date,
        default: Date.now()
    }
})

const User = module.exports = mongoose.model('Post', PostSchema);