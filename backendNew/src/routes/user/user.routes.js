import express from 'express';
import { getUserProfile, updateUserProfile } from '../../controllers/user.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

const router = express.Router();


router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.post('/profile', verifyToken, updateUserProfile);



// ✅ User dashboard summary (bookings, orders, cart etc.)
// router.get('/summary', verifyToken, getUserDashboardSummary);

export default router;
