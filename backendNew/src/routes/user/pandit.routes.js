// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import express from 'express';
import { getAllPandits, getPanditById } from '../../controllers/pandit.controller.js';
// optionally import verifyToken if needed
const router = express.Router();

// Optional: add verifyToken if you want only logged-in users to view pandits
router.get('/', getAllPandits);
router.get('/:id', getPanditById);

export default router;
