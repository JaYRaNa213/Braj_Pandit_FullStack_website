// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// backend/routes/user/cart.routes.js

import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  syncCart,
} from '../../controllers/cart.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';


const router = express.Router();

router.get("/", verifyToken, getUserCart);
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateCartItem);
router.delete("/remove", verifyToken, removeCartItem);
router.put("/sync", verifyToken, syncCart); // You create this


export default router;
