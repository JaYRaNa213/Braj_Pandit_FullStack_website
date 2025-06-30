// File: backendNew/src/routes/admin/live.routes.js

import express from "express";
import {
  addChannels,
  getChannels,
  deleteChannel
} from "../../controllers/live.controller.js";

import { verifyToken, isAdmin } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, addChannels);       // Add bulk channels
router.get("/", verifyToken, isAdmin, getChannels);        // Get all channels
router.delete("/:id", verifyToken, isAdmin, deleteChannel); // Delete channel

export default router;
