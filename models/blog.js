const mongoose = require('mongoose');

const blogSchema = mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    Title: { type: String , required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true,},
    description: { type: String , required: true },
    date: { type: Date, required: true, default: Date.now},
    blogImage: { type: String , required: true }
});

module.exports = mongoose.model('Blogs', blogSchema);