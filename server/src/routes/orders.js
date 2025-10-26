const express = require('express');
const { createOrder, getOrderById, listOrders, updateOrderStatus, notifyOrder } = require('@src/controllers/orderController');
const { requireAuth, isAdmin } = require('@src/middlewares/auth');

const router = express.Router();

router.post('/', requireAuth, createOrder);
router.get('/', requireAuth, listOrders);
router.get('/:id', requireAuth, getOrderById);
router.patch('/:id/status', requireAuth, isAdmin, updateOrderStatus);
router.post('/:id/notify', requireAuth, isAdmin, notifyOrder);

module.exports = router;
