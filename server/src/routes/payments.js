const express = require('express');
const { createIntent, confirmPayment } = require('@src/controllers/paymentController');
const { requireAuth } = require('@src/middlewares/auth');

const router = express.Router();

router.post('/create-intent', requireAuth, createIntent);
router.post('/confirm', requireAuth, confirmPayment);

module.exports = router;
