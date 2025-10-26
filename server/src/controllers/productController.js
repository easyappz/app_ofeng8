const Product = require('@src/models/Product');

function parseNumber(value, def) {
  const num = Number(value);
  return Number.isFinite(num) ? num : def;
}

async function listProducts(req, res) {
  try {
    const {
      q,
      category,
      priceMin,
      priceMax,
      ratingMin,
      inStock,
      sort = 'new',
      page = 1,
      limit = 12,
    } = req.query || {};

    const filter = {};

    if (q && typeof q === 'string' && q.trim().length > 0) {
      const qLower = q.trim().toLowerCase();
      filter.$or = [{ titleLower: qLower }, { descriptionLower: qLower }];
    }

    if (category) {
      filter.category = String(category);
    }

    const min = parseNumber(priceMin, null);
    const max = parseNumber(priceMax, null);
    if (min !== null || max !== null) {
      filter.price = {};
      if (min !== null) filter.price.$gte = min;
      if (max !== null) filter.price.$lte = max;
    }

    const rMin = parseNumber(ratingMin, null);
    if (rMin !== null) {
      filter.ratingAvg = { $gte: rMin };
    }

    if (String(inStock) === '1' || String(inStock).toLowerCase() === 'true') {
      filter.stock = { $gt: 0 };
    }

    const sortMap = {
      new: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
    };
    const sortObj = sortMap[sort] || sortMap.new;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 12));

    const total = await Product.countDocuments(filter);
    const items = await Product.find(filter)
      .sort(sortObj)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();

    return res.json({ items, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).lean();
    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }
    return res.json({ item: product });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function createProduct(req, res) {
  try {
    const { title, description = '', price, stock, images = [], category = '' } = req.body || {};
    if (!title || typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({ error: { message: 'Missing title, price or stock' } });
    }

    const product = await Product.create({
      title,
      titleLower: title.toLowerCase(),
      description,
      descriptionLower: (description || '').toLowerCase(),
      category,
      price,
      stock,
      images,
    });

    return res.status(201).json({ item: product.toObject() });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    if (payload.title) payload.titleLower = String(payload.title).toLowerCase();
    if (payload.description !== undefined) payload.descriptionLower = String(payload.description || '').toLowerCase();

    const product = await Product.findByIdAndUpdate(id, payload, { new: true });
    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }

    return res.json({ item: product.toObject() });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }
    // Reviews can be left as-is; they reference a deleted product id (intentional per requirements)
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
