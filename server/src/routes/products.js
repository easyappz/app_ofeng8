const express = require('express');
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('@src/controllers/productController');
const { getReviews, addReview } = require('@src/controllers/reviewController');
const { requireAuth, isAdmin } = require('@src/middlewares/auth');

const router = express.Router();

// Catalog
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', requireAuth, isAdmin, createProduct);
router.put('/:id', requireAuth, isAdmin, updateProduct);
router.delete('/:id', requireAuth, isAdmin, deleteProduct);

// Reviews
router.get('/:id/reviews', getReviews);
router.post('/:id/reviews', requireAuth, addReview);

module.exports = router;
