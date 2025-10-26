const Cart = require('@src/models/Cart');
const Product = require('@src/models/Product');

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

async function getCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    const populated = await cart.populate({ path: 'items.product', select: 'title price stock images' });
    return res.json({ cart: populated.toObject() });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function addToCart(req, res) {
  try {
    const { productId, qty } = req.body || {};
    const qtyNum = Number(qty);
    if (!productId || !Number.isFinite(qtyNum) || qtyNum <= 0) {
      return res.status(400).json({ error: { message: 'Invalid productId or qty' } });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }
    if (product.stock <= 0) {
      return res.status(400).json({ error: { message: 'Product out of stock' } });
    }

    const cart = await getOrCreateCart(req.user._id);
    const idx = cart.items.findIndex((i) => String(i.product) === String(productId));
    if (idx >= 0) {
      const newQty = Math.min(product.stock, cart.items[idx].qty + qtyNum);
      cart.items[idx].qty = newQty;
      cart.items[idx].priceSnapshot = product.price;
    } else {
      cart.items.push({ product: productId, qty: Math.min(product.stock, qtyNum), priceSnapshot: product.price });
    }

    await cart.save();
    const populated = await cart.populate({ path: 'items.product', select: 'title price stock images' });
    return res.status(201).json({ cart: populated.toObject() });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function updateQty(req, res) {
  try {
    const { productId } = req.params;
    const { qty } = req.body || {};
    const qtyNum = Number(qty);
    if (!Number.isFinite(qtyNum) || qtyNum <= 0) {
      return res.status(400).json({ error: { message: 'qty must be > 0' } });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }
    if (product.stock < qtyNum) {
      return res.status(400).json({ error: { message: 'Insufficient stock', details: { stock: product.stock } } });
    }

    const cart = await getOrCreateCart(req.user._id);
    const idx = cart.items.findIndex((i) => String(i.product) === String(productId));
    if (idx < 0) {
      return res.status(404).json({ error: { message: 'Item not found in cart' } });
    }
    cart.items[idx].qty = qtyNum;
    cart.items[idx].priceSnapshot = product.price;

    await cart.save();
    const populated = await cart.populate({ path: 'items.product', select: 'title price stock images' });
    return res.json({ cart: populated.toObject() });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function removeItem(req, res) {
  try {
    const { productId } = req.params;
    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((i) => String(i.product) !== String(productId));
    await cart.save();
    const populated = await cart.populate({ path: 'items.product', select: 'title price stock images' });
    return res.json({ cart: populated.toObject() });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function clearCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    return res.json({ cart: cart.toObject() });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

module.exports = { getCart, addToCart, updateQty, removeItem, clearCart };
