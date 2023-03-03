const mongoose = require('mongoose');

//adding models and schema
const Category = require('../models/category');

// for getting all categorys
exports.get_categorys = (req, res, next) => {
    Category.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                category: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

//for creating new category
exports.create_category = (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
    });
    category.save()
        .then(result => {
            res.status(201).json({
                createdCategory: {
                    _id: result._id,
                    name: result.name,
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

//for updating the categorys
exports.update_category = (req, res, next) => {
    Category.updateOne({ _id: req.params.categoryId }, { $set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Updated category',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//for deleting the category
exports.delete_category = (req, res, next) => {
    Category.deleteOne({ _id: req.params.categoryId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'category Deleted',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}