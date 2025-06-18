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
