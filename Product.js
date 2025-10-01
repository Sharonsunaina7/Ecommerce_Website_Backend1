// models/Product.js
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  description: String,
  basePrice: { type: Number, required: true }, // base price, dynamic pricing computed in controller
  options: { type: Object, default: {} }, // e.g., sizes, paper types with multipliers
  images: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
