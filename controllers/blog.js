const mongoose = require('mongoose');

//adding models
const Blogs = require('../models/blog');
const Category = require('../models/category');

//Get All blogs
exports.get_blogs = (req, res, next) => {
    Blogs.find()
        .populate('category', 'name')
        .exec()
        .then(docs => {
            const result = {
                blogs: docs.map(doc => {
                    return {
                        _id: doc._id,
                        Title: doc.Title,
                        category: doc.category,
                        description: doc.description,
                    }
                })
            }
            res.status(200).json(result);
        })
}

//for Creating new blog
exports.create_blog = (req, res, next) => {
    Category.findById(req.body.categoryId)
        .then(category => {
            if (category) {
                const blog = new Blogs({
                    _id: new mongoose.Types.ObjectId,
                    Title: req.body.Title,
                    category: req.body.categoryId,
                    description: req.body.description,
                    date: req.body.date,
                    blogImage: req.file.path
                });
                blog.save()
                    .then(result => {
                        res.status(201).json({
                            createdBlog: {
                                _id: result._id,
                                Title: result.Title,
                                category: result.category,
                                description: result.description,
                                date: result.date,
                                blogImage: result.blogImage
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
            else {
                return res.status(404).json({
                    message: 'blog not found'
                });
            }
        })
}

//for finding blog by id
exports.blog_get = (req, res, next) => {
    const id = req.params.blogId;
    Blogs.findById(id)
        .populate('category', 'name')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    blog: doc,
                });
            } else {
                res.status(404).json({ message: 'Id not Found' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//for updating the blogs
exports.update_blog = (req, res, next) => {
    Blogs.updateOne({ _id: req.params.blogId }, { $set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Updated blog',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//for deleting the blog
exports.delete_blog = (req, res, next) => {
    Blogs.deleteOne({ _id: req.params.blogId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'blog Deleted',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
