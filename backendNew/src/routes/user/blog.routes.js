// File: backendNew/src/routes/user/blog.routes.js

import express from 'express';
import { getAllBlogs, getBlogById } from '../../controllers/blog.controller.js';

const router = express.Router();

// Public: Get all blogs
router.get('/', getAllBlogs);

// Public: Get a blog by ID
router.get('/:id', getBlogById);

export default router;
