//src/routes/user/order.routes.js


import express from 'express';
import { placeOrder, getMyOrders } from '../../controllers/order.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

// User places an order (from cart with address, etc.)
router.post('/', verifyToken, placeOrder);

// User views their own orders
router.get('/my', verifyToken, getMyOrders);

export default router;
