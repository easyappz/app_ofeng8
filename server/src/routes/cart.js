const express = require('express');
const { getCart, addToCart, updateQty, removeItem, clearCart } = require('@src/controllers/cartController');
const { requireAuth } = require('@src/middlewares/auth');

const router = express.Router();

router.get('/', requireAuth, getCart);
router.post('/', requireAuth, addToCart);
router.put('/:productId', requireAuth, updateQty);
router.delete('/:productId', requireAuth, removeItem);
router.delete('/', requireAuth, clearCart);

module.exports = router;
