import express from 'express';
import { getAllPandits, getPanditById } from '../../controllers/pandit.controller.js';
// optionally import verifyToken if needed
const router = express.Router();

// Optional: add verifyToken if you want only logged-in users to view pandits
router.get('/', getAllPandits);
router.get('/:id', getPanditById);

export default router;
