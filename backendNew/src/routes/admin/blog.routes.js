// admin/// blog.routes.js

import express from 'express';
import { addBlog, updateBlog, deleteBlog } from '../../controllers/blog.controller.js';
import { isAuthenticated } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/role.middleware.js';
import { uploadSingle } from '../../middleware/upload.middleware.js';

const router = express.Router();

// Admin: Add a new blog with image upload
router.post('/', isAuthenticated, authorizeRoles('admin'), uploadSingle('image'), addBlog);

// Admin: Update a blog by ID
router.put('/:id', isAuthenticated, authorizeRoles('admin'), uploadSingle('image'), updateBlog);


// Admin: Delete a blog by ID
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), deleteBlog);

export default router;
