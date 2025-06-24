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
