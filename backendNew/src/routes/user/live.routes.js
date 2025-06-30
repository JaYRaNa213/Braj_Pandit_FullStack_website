// =====================================
// 3. routes/user/live.routes.js
// =====================================
import express from "express";
import { getLiveHome, getLiveAll } from "../../controllers/live.controller.js";

const router = express.Router();
router.get("/home", getLiveHome);   // /api/live/home
router.get("/all", getLiveAll);     // /api/live/all
export default router;
