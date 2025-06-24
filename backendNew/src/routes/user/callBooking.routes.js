// File: src/routes/user/callBooking.routes.js

import express from "express";
import { sendBookingEmail } from "../../controllers/callBooking.controller.js";

const router = express.Router();

router.post("/", sendBookingEmail); // POST /api/user/callBookings

export default router;
