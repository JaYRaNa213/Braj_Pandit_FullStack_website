// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import express from 'express';
import
 { getAllOrders,
   updateOrderStatus,
   getOrderById,
   cancelOrder,
   } from '../../controllers/order.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllOrders);
router.put('/:id/status', verifyToken, updateOrderStatus);
router.get('/:id', verifyToken, getOrderById);
router.delete('/:id/cancel', verifyToken, cancelOrder);

export default router;
