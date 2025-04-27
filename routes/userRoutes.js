const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Routes
router.post('/users', userController.createUser); // For creating users (testing/setup)
router.post('/login', userController.login);
router.get('/users/email/:email', userController.getUserByEmail);
router.put('/users/password', userController.changePassword);

module.exports = router;