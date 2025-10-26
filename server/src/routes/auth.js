const express = require('express');

const authController = require('@src/controllers/authController');
const userController = require('@src/controllers/userController');
const auth = require('@src/middlewares/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/me
router.get('/me', auth, userController.getMe);

module.exports = router;
