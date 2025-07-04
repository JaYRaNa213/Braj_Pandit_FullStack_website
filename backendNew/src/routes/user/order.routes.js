// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

//src/routes/user/order.routes.js


import express from 'express';
import { placeOrder, getMyOrders ,getOrderTrackingStatus} from '../../controllers/order.controller.js';
import { verifyToken,authMiddleware ,authorizeRoles} from '../../middleware/auth.middleware.js';

const router = express.Router();

// User places an order (from cart with address, etc.)
router.post('/', verifyToken, placeOrder);

// User views their own orders
router.get('/my', verifyToken, getMyOrders);

// GET /user/orders/:id/tracking
router.get("/:id/tracking", authMiddleware, authorizeRoles("user"), getOrderTrackingStatus);


export default router;
