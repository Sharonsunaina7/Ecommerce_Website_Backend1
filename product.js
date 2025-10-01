// routes/product.js
const express = require('express');
const Product = require('../models/Product');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Create product (admin)
router.post('/', auth, adminOnly, async (req,res) => {
  try {
    const p = await Product.create({ ...req.body, createdBy: req.user._id });
    res.json(p);
  } catch(err){ res.status(500).json({error: err.message}); }
});

// List
router.get('/', async (req,res) => {
  const products = await Product.find().limit(100);
  res.json(products);
});

// Get one
router.get('/:id', async (req,res) => {
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({message:'Not found'});
  res.json(p);
});

// Update (admin)
router.put('/:id', auth, adminOnly, async (req,res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

// Delete
router.delete('/:id', auth, adminOnly, async (req,res)=> {
  await Product.findByIdAndDelete(req.params.id);
  res.json({message:'deleted'});
});

// Example dynamic pricing endpoint (client sends chosen specs)
router.post('/:id/price', async (req,res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message:'not found'});
    // Simple example: quantity multiplier + option multipliers
    const { quantity=1, selectedOptions = {} } = req.body;
    let price = product.basePrice;
    // apply options multipliers (example: paperType: 1.2)
    Object.values(selectedOptions).forEach(mult => {
      if(typeof mult === 'number') price *= mult;
    });
    // quantity discount example
    if(quantity >= 100) price *= 0.8;
    price = price * quantity;
    res.json({ price });
  } catch(err) { res.status(500).json({error: err.message}); }
});

module.exports = router;
