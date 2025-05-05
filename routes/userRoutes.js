const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password   
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullname:
 *                 type: string
 *               region:
 *                 type: string
 *               province:
 *                 type: string
 *               city:
 *                 type: string
 *               barangay:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/users', userController.createUser);

router.post('/login', userController.login);
router.get('/users/email/:email', userController.getUserByEmail);
router.put('/users/password', userController.changePassword);
router.get('/users/getAllUsers', userController.getAllUSers);
router.post('/users/reset-password', userController.resetPassword);
router.post('/users/forgot-password', userController.forgotPassword);
router.put('/users/update-user', userController.updateUserByEmail);
router.post('/users/deactivate-user', userController.deactivateUser);

module.exports = router;