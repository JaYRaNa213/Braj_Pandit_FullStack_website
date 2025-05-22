import express from 'express';
import { updateUserProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.put('/profile', authMiddleware, updateUserProfile);

export default router;
