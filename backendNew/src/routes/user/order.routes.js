import express from 'express';
import { placeOrder, getUserOrders } from '../../controllers/order.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';
import { getMyOrders } from "../../controllers/order.controller.js";

const router = express.Router();

router.post('/', verifyToken, placeOrder);
router.get("/my", verifyToken, getMyOrders); // /api/orders/my
router.get('/', verifyToken, getUserOrders);

export default router;
