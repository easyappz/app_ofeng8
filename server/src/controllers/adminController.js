const User = require('@src/models/User');
const Product = require('@src/models/Product');
const Order = require('@src/models/Order');

async function dashboard(req, res) {
  try {
    const [usersCount, productsCount, ordersCount, paidOrders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.find({ status: { $in: ['paid', 'shipped', 'completed'] } }).select('total').lean(),
    ]);

    const salesTotal = paidOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    return res.json({ usersCount, productsCount, ordersCount, salesTotal });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

module.exports = { dashboard };
