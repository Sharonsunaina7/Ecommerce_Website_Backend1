// routes/order.js
const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');
const router = express.Router();

// create order (mock payment)
router.post('/', auth, async (req,res) => {
  try {
    const { items, files = [] } = req.body; // items: [{productId, quantity, specs}]
    let total = 0;
    const populatedItems = [];
    for (const it of items) {
      const p = await Product.findById(it.productId);
      if(!p) return res.status(400).json({message:'Invalid product'});
      // use product.basePrice + simple spec multiplier
      let unitPrice = p.basePrice;
      if(it.specs) {
        Object.values(it.specs).forEach(v => { if(typeof v === 'number') unitPrice *= v; });
      }
      const price = unitPrice * (it.quantity || 1);
      total += price;
      populatedItems.push({
        product: p._id,
        quantity: it.quantity || 1,
        specs: it.specs || {},
        price
      });
    }

    // create order with paymentStatus pending
    const order = await Order.create({
      user: req.user._id,
      items: populatedItems,
      total,
      files,
      paymentStatus: 'pending'
    });

    // Return order and a mock payment token/url
    res.json({ order, payment: { mode: 'mock', clientSecret: 'mock_client_secret_for_demo' } });
  } catch(err) { res.status(500).json({error: err.message}); }
});

// endpoint to mark payment success (in real life webhook)
router.post('/:id/payment-success', auth, async (req,res) => {
  const order = await Order.findById(req.params.id);
  if(!order) return res.status(404).json({message:'not found'});
  order.paymentStatus = 'paid';
  await order.save();
  res.json(order);
});

module.exports = router;
