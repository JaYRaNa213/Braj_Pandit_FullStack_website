// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// //src/routes/user/live.routes.js

// import express from "express";
// import { getLiveVideos } from "../../controllers/live.controller.js";
// const router = express.Router();

// router.get("/", getLiveVideos);

// export default router;



import express from "express";
import { getLiveVideos } from "../../controllers/live.controller.js";

const router = express.Router();

router.get("/", getLiveVideos);

export default router;
