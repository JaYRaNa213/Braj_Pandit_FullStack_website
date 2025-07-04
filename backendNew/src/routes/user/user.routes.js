// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import express from 'express';
import { getUserProfile, updateUserProfile, uploadProfileImage } from '../../controllers/user.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';
// import upload from "../../middleware/multer.middleware.js";
import { uploadSingle } from '../../middleware/upload.middleware.js';

const router = express.Router();

// Profile endpoints
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);

// // Image upload
// router.post("/upload-image", verifyToken, upload.single("file"), uploadProfileImage);

router.post("/upload-image", verifyToken, uploadSingle("file"), uploadProfileImage);

export default router;
