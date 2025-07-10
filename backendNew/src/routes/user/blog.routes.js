import express from 'express';
import upload from '../../middleware/multer.middleware.js';
import {
  
  getAllBlogs,
  getBlogById,
  
} from '../../controllers/blog.controller.js';

const router = express.Router();


// GET: All blogs
router.get('/', getAllBlogs);

// GET: Blog by ID
router.get('/:id', getBlogById);

// PUT: Update blog


export default router;
