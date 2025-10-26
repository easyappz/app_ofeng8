const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    titleLower: { type: String, required: true, index: true },
    description: { type: String, default: '', trim: true },
    descriptionLower: { type: String, default: '', index: true },
    category: { type: String, default: '', index: true },
    price: { type: Number, required: true, min: 0, index: true },
    stock: { type: Number, required: true, min: 0, index: true },
    images: [{ type: String }],
    ratingAvg: { type: Number, default: 0, min: 0, max: 5, index: true },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
