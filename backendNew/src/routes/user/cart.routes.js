// backend/routes/user/cart.routes.js
import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
} from "../../controllers/cart.controller.js";
import { verifyToken } from '../../middleware/auth.middleware.js';


const router = express.Router();

router.get("/", verifyToken, getUserCart);
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateCartItem);
router.delete("/remove", verifyToken, removeCartItem);

export default router;
