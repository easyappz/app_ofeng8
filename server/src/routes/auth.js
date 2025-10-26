const express = require('express');
const { register, login, me } = require('@src/controllers/authController');
const { requireAuth } = require('@src/middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);

module.exports = router;
