import express from 'express';
import upload from '../../middleware/multer.middleware.js';
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../../controllers/blog.controller.js';

const router = express.Router();

// POST: Create blog
router.post('/', upload.single('image'), addBlog);

// GET: All blogs
router.get('/', getAllBlogs);

// GET: Blog by ID
router.get('/:id', getBlogById);

// PUT: Update blog
router.put('/:id', upload.single('image'), updateBlog);

// DELETE: Delete blog
router.delete('/:id', deleteBlog);

export default router;
