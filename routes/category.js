const express = require('express');
const router = express.Router();

//adding controllers
const categoryController = require('../controllers/category');
const authentication = require('../middleware/authentication');

// for getting all categorys
router.get('/', authentication, categoryController.get_categorys)

//for creating new category
router.post('/', authentication, categoryController.create_category)

//for updating the categorys
router.patch('/:categoryId', authentication, categoryController.update_category);

//for deleting the category
router.delete('/:categoryId', authentication, categoryController.delete_category);

module.exports = router;