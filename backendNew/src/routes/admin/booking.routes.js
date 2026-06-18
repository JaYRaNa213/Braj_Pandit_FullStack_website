// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/routes/admin/booking.routes.js
import express from "express";
import { verifyToken } from "../../middleware/auth.middleware.js";
import { isAdmin } from "../../middleware/role.middleware.js";
import {
  getAllBookings,
  updateBookingStatus,
} from "../../controllers/booking.controller.js";

const router = express.Router();

router.use(verifyToken, isAdmin);

router.get("/", getAllBookings);
router.put("/:id", updateBookingStatus);

export default router;
