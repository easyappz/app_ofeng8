const express = require('express');
const { dashboard } = require('@src/controllers/adminController');
const { requireAuth, isAdmin } = require('@src/middlewares/auth');

const router = express.Router();

router.get('/dashboard', requireAuth, isAdmin, dashboard);

module.exports = router;
