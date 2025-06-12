import express from 'express';
import {
  addBlog,
  getAllBlogs,
  
  updateBlog,
  deleteBlog
} from '../../controllers/blog.controller.js';

import { authMiddleware } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/role.middleware.js';

const router = express.Router();

// ✅ Admin create blog
router.post('/', authMiddleware, authorizeRoles('admin'), addBlog);

// ✅ Admin get all blogs
router.get('/', authMiddleware, authorizeRoles('admin'), getAllBlogs);

// // ✅ Admin get single blog
// router.get('/:id', authMiddleware, authorizeRoles('admin'), getSingleBlog);

// ✅ Admin update blog
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateBlog);

// ✅ Admin delete blog
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteBlog);

export default router;
