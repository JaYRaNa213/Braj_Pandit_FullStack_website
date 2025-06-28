// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import express from 'express';
import {
  addBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogById, // ✅ add this import if needed
} from '../../controllers/blog.controller.js';

import { authMiddleware } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/role.middleware.js';
import { uploadSingle } from '../../middleware/upload.middleware.js'; // ✅ use named import

const router = express.Router();

// ✅ Admin create blog with image
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  uploadSingle('image'), // ✅ add this line
  addBlog
);

// ✅ Admin get all blogs
router.get('/', authMiddleware, authorizeRoles('admin'), getAllBlogs);
// ✅ Add this route after the getAllBlogs route
router.get('/:id', authMiddleware, authorizeRoles('admin'), getBlogById);

// ✅ Admin update blog with image (optional)
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  uploadSingle('image'), // ✅ reuse same for update
  updateBlog
);

// ✅ Admin delete blog
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteBlog);

export default router;
