// routes/upload.js
const express = require('express');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const path = require('path');
const fs = require('fs');
const { uploadToS3 } = require('../utils/s3');

const router = express.Router();

// local storage (easy, works offline)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const d = path.join(__dirname, '..', 'uploads');
    if(!fs.existsSync(d)) fs.mkdirSync(d);
    cb(null, d);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } }); // 20MB

// Upload file and return path (local)
router.post('/file', auth, upload.single('file'), async (req,res) => {
  res.json({ path: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

// Upload to S3 (enable when AWS env is configured)
// expects field 'file'
router.post('/s3', auth, upload.single('file'), async (req,res) => {
  try {
    // read file
    const localPath = req.file.path;
    const s3Result = await uploadToS3(localPath, req.file.filename);
    // optionally delete local file
    fs.unlinkSync(localPath);
    res.json({ s3Url: s3Result.Location || s3Result.Key || s3Result });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
