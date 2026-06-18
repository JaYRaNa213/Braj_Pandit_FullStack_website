// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import express from 'express';
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../../controllers/blog.controller.js';

import { authMiddleware } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/role.middleware.js';
import { uploadSingle } from '../../middleware/upload.middleware.js'; // handles "image" field

const router = express.Router();

// ✅ Create a new blog with image
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  uploadSingle('image'), // from formData
  addBlog
);

// ✅ Get all blogs (with optional search/category/lang filtering)
router.get(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  getAllBlogs
);

// ✅ Get single blog by ID
router.get(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  getBlogById
);

// ✅ Update blog with optional image upload
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  uploadSingle('image'), // optional image file
  updateBlog
);

// ✅ Delete blog
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  deleteBlog
);

export default router;
