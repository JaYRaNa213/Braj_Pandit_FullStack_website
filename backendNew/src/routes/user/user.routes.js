// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

//src/routes/user/user.routes.js


import express from 'express';
import { getUserProfile, updateUserProfile } from '../../controllers/user.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

import  upload  from "../../middleware/multer.middleware.js";
import { uploadProfileImage } from "../../controllers/user.controller.js";

const router = express.Router();


router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.post("/upload", verifyToken, upload.single("file"),uploadProfileImage);

router.post("/upload-image", verifyToken, upload.single("file"), uploadProfileImage);



// ✅ User dashboard summary (bookings, orders, cart etc.)
// router.get('/summary', verifyToken, getUserDashboardSummary);

export default router;





