const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const NotificationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true, min: 0, index: true },
    status: { type: String, enum: ['created', 'paid', 'shipped', 'completed', 'cancelled'], default: 'created', index: true },
    delivery: {
      method: { type: String, default: 'standard' },
      address: { type: String, default: '' },
    },
    payment: {
      method: { type: String, default: 'mock' },
      status: { type: String, enum: ['pending', 'requires_confirmation', 'succeeded', 'failed'], default: 'pending' },
      clientSecret: { type: String, default: '' },
    },
    notifications: { type: [NotificationSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
