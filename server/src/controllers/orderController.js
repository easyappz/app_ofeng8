const Cart = require('@src/models/Cart');
const Product = require('@src/models/Product');
const Order = require('@src/models/Order');

function createNotification(type, message) {
  return { type, message, timestamp: new Date() };
}

async function createOrder(req, res) {
  try {
    const { delivery = {}, payment = {} } = req.body || {};

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: { message: 'Cart is empty' } });
    }

    const productIds = cart.items.map((i) => i.product);
    const productsMap = new Map();
    const products = await Product.find({ _id: { $in: productIds } });
    products.forEach((p) => productsMap.set(String(p._id), p));

    let total = 0;
    const items = [];
    for (const it of cart.items) {
      const p = productsMap.get(String(it.product));
      if (!p) {
        return res.status(400).json({ error: { message: 'Product not found in cart', details: { productId: String(it.product) } } });
      }
      if (p.stock < it.qty) {
        return res.status(400).json({ error: { message: 'Insufficient stock for product', details: { productId: String(p._id), stock: p.stock } } });
      }
      const price = p.price;
      total += price * it.qty;
      items.push({ product: p._id, title: p.title, price, qty: it.qty });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      status: 'created',
      delivery: { method: delivery.method || 'standard', address: delivery.address || '' },
      payment: { method: payment.method || 'mock', status: 'pending', clientSecret: '' },
      notifications: [createNotification('order_created', 'Order has been created')],
    });

    // Clear cart after order creation
    cart.items = [];
    await cart.save();

    return res.status(201).json({ order: order.toObject(), notifications: order.notifications });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate({ path: 'items.product', select: 'title price' }).lean();
    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found' } });
    }
    if (String(order.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: { message: 'Access denied' } });
    }
    return res.json({ order });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function listOrders(req, res) {
  try {
    const isAdmin = req.user.role === 'admin';
    const { all } = req.query || {};
    const filter = isAdmin && (String(all) === '1' || String(all).toLowerCase() === 'true') ? {} : { user: req.user._id };
    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
    return res.json({ items: orders });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body || {};
    const allowed = ['created', 'paid', 'shipped', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: { message: 'Invalid status', details: { allowed } } });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found' } });
    }

    order.status = status;
    order.notifications.push({ type: 'status_changed', message: `Order status changed to ${status}`, timestamp: new Date() });
    await order.save();

    return res.json({ order: order.toObject(), notifications: order.notifications });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function notifyOrder(req, res) {
  try {
    const { id } = req.params;
    const { message = 'Admin notification' } = req.body || {};
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found' } });
    }
    const note = { type: 'admin_notice', message, timestamp: new Date() };
    order.notifications.push(note);
    await order.save();
    return res.json({ notification: note, notifications: order.notifications });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

module.exports = { createOrder, getOrderById, listOrders, updateOrderStatus, notifyOrder };
