import express from 'express';
import { placeOrder, getUserOrders } from '../../controllers/order.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, placeOrder);
router.get('/', verifyToken, getUserOrders);

export default router;
