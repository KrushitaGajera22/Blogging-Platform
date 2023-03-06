const express = require('express');
const router = express.Router();

//adding controllers
const categoryController = require('../controllers/category');
const { isAdmin } = require('../middleware/authentication');

// for getting all categorys
router.get('/', isAdmin, categoryController.get_categorys)

//for creating new category
router.post('/', isAdmin, categoryController.create_category)

//for updating the categorys
router.patch('/:categoryId', isAdmin, categoryController.update_category);

//for deleting the category
router.delete('/:categoryId', isAdmin, categoryController.delete_category);

module.exports = router;