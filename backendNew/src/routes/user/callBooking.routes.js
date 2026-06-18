// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// File: src/routes/user/callBooking.routes.js

import express from "express";
import { sendBookingEmail } from "../../controllers/callBooking.controller.js";

const router = express.Router();

router.post("/", sendBookingEmail); // POST /api/user/callBookings

export default router;
