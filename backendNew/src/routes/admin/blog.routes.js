// src/routes/admin/blog.routes.js
import express from 'express';
import {
  addBlog,
  updateBlog,
  deleteBlog,
} from '../../controllers/blog.controller.js';
import { verifyToken, authorizeRoles } from '../../middleware/auth.middleware.js';
import upload from '../../middleware/multer.middleware.js';

const router = express.Router();

// 🛡️ Admin Blog Routes
router.post('/blogs', verifyToken, authorizeRoles('admin'), upload.single('image'), addBlog);
router.put('/blogs/:id', verifyToken, authorizeRoles('admin'), upload.single('image'), updateBlog);
router.delete('/blogs/:id', verifyToken, authorizeRoles('admin'), deleteBlog);

export default router;
