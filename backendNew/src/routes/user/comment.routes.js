import express from 'express';
import {
  addComment,
  getCommentsByBlogId,
  deleteComment,
} from '../../controllers/comment.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/:blogId', authMiddleware, addComment);
router.get('/:blogId', getCommentsByBlogId);
router.delete('/:commentId', authMiddleware, deleteComment);

export default router;
