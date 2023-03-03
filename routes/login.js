const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

// for creating new user
router.post('/signup', loginController.signup);

//for login
router.post('/login', loginController.login);

//for logout
router.delete('/:loginId', loginController.login_delete);

module.exports = router;