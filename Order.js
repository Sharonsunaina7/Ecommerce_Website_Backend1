// models/Order.js
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    specs: Object,
    price: Number
  }],
  total: Number,
  paymentStatus: { type: String, enum: ['pending','paid','failed','refunded'], default: 'pending' },
  status: { type: String, enum: ['new','in_production','shipped','delivered','cancelled'], default: 'new' },
  files: [String], // S3 URLs or local paths
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
