const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('@src/routes/auth');
const productRoutes = require('@src/routes/products');
const cartRoutes = require('@src/routes/cart');
const orderRoutes = require('@src/routes/orders');
const paymentRoutes = require('@src/routes/payments');
const adminRoutes = require('@src/routes/admin');

const router = express.Router();

// GET /api/hello
router.get('/hello', async (req, res) => {
  try {
    res.json({ message: 'Hello from API!' });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
});

// GET /api/status
router.get('/status', async (req, res) => {
  try {
    const dbStateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized'
    };
    const dbState = mongoose.connection && typeof mongoose.connection.readyState === 'number'
      ? dbStateMap[mongoose.connection.readyState] || 'unknown'
      : 'unknown';

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      db: { state: dbState }
    });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
});

// Sub-routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
