// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// File: backendNew/src/routes/user/blog.routes.js

import express from 'express';
import { getAllBlogs, getBlogById } from '../../controllers/blog.controller.js';

const router = express.Router();

// Public: Get all blogs
router.get('/', getAllBlogs);

// Public: Get a blog by ID
router.get('/:id', getBlogById);

export default router;
