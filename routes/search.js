const express = require('express');
const router = express.Router();

const searchController = require('../controllers/search');

//for searching title of blog
router.get('/', searchController.search)
module.exports = router;