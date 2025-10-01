// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req,res) => {
  try {
    const { name, email, password } = req.body;
    if(!email || !password) return res.status(400).json({message:'missing'});
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({message:'User exists'});
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ user: { id: user._id, email: user.email, name: user.name }, token });
  } catch(err) { res.status(500).json({error: err.message}); }
});

router.post('/login', async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({message:'Invalid creds'});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({message:'Invalid creds'});
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin }});
  } catch(err){ res.status(500).json({error: err.message}); }
});

module.exports = router;
