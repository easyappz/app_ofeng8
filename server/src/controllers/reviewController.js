const Review = require('@src/models/Review');
const Product = require('@src/models/Product');

async function getReviews(req, res) {
  try {
    const { id: productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate({ path: 'user', select: 'name email' })
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ items: reviews });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

async function addReview(req, res) {
  try {
    const { id: productId } = req.params;
    const { rating, comment = '' } = req.body || {};

    if (!rating || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ error: { message: 'Rating must be between 1 and 5' } });
    }

    const existing = await Review.findOne({ product: productId, user: req.user._id }).lean();
    if (existing) {
      return res.status(400).json({ error: { message: 'You have already reviewed this product' } });
    }

    const review = await Review.create({ product: productId, user: req.user._id, rating: Number(rating), comment });

    const stats = await Review.aggregate([
      { $match: { product: review.product } },
      { $group: { _id: '$product', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);

    if (stats && stats[0]) {
      await Product.findByIdAndUpdate(review.product, {
        ratingAvg: Number(stats[0].avg.toFixed(2)),
        ratingCount: stats[0].count,
      });
    }

    return res.status(201).json({ item: review.toObject() });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message, details: { name: error.name, stack: error.stack } } });
  }
}

module.exports = { getReviews, addReview };
