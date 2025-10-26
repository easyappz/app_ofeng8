const Order = require('@src/models/Order');
const Product = require('@src/models/Product');
const { PAYMENT_CLIENT_SECRET_PREFIX } = require('@src/config/constants');

function randomId() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

async function createIntent(req, res) {
  try {
    const { orderId } = req.body || {};
    if (!orderId) {
      return res.status(400).json({ error: { message: 'orderId is required' } });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found' } });
    }
    if (String(order.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: { message: 'Access denied' } });
    }
    if (order.status !== 'created') {
      return res.status(400).json({ error: { message: 'Payment intent can be created only for orders in created status' } });
    }

    const clientSecret = `${PAYMENT_CLIENT_SECRET_PREFIX}${order._id}_${randomId()}`;
    order.payment.clientSecret = clientSecret;
    order.payment.status = 'requires_confirmation';
    await order.save();

    return res.json({ clientSecret, mock: true });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function confirmPayment(req, res) {
  try {
    const { orderId, clientSecret } = req.body || {};
    if (!orderId || !clientSecret) {
      return res.status(400).json({ error: { message: 'orderId and clientSecret are required' } });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found' } });
    }
    if (String(order.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: { message: 'Access denied' } });
    }
    if (order.status !== 'created') {
      return res.status(400).json({ error: { message: 'Order is not in a payable state' } });
    }
    if (!order.payment.clientSecret || order.payment.clientSecret !== clientSecret) {
      return res.status(400).json({ error: { message: 'Invalid clientSecret' } });
    }

    // Re-validate stock before marking as paid and reduce stock
    for (const it of order.items) {
      const product = await Product.findById(it.product);
      if (!product) {
        return res.status(400).json({ error: { message: 'Product not found for order item', details: { productId: String(it.product) } } });
      }
      if (product.stock < it.qty) {
        return res.status(400).json({ error: { message: 'Insufficient stock at payment', details: { productId: String(product._id), stock: product.stock } } });
      }
    }

    for (const it of order.items) {
      await Product.updateOne({ _id: it.product }, { $inc: { stock: -it.qty } });
    }

    order.status = 'paid';
    order.payment.status = 'succeeded';
    order.notifications.push({ type: 'payment_succeeded', message: 'Payment confirmed. Order is paid.', timestamp: new Date() });
    await order.save();

    return res.json({ order: order.toObject(), notifications: order.notifications });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

module.exports = { createIntent, confirmPayment };
