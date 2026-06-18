// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

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
