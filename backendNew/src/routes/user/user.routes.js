import express from 'express';
import { updateUserProfile, getUserDashboardSummary } from '../../controllers/user.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

// ✅ Update user profile
router.put('/profile', verifyToken, updateUserProfile);

// ✅ User dashboard summary (bookings, orders, cart etc.)
router.get('/summary', verifyToken, getUserDashboardSummary);

export default router;
