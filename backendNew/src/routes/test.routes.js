// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import express from 'express';

const router = express.Router();

// ✅ Define GET request for /api/test
router.get('/', (req, res) => {
  res.status(200).json({ message: 'GET request to /api/test successful!' });
});

// ✅ Define POST request for /api/test (Optional)
router.post('/', (req, res) => {
  const data = req.body;
  res.status(201).json({ message: 'POST request to /api/test successful!', data });
});

export default router;
