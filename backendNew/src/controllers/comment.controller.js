// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import Comment from '../models/comment.model.js';

export const addComment = async (req, res) => {
  const { content } = req.body;
  const { blogId } = req.params;

  if (!content?.trim()) {
    return res.status(400).json({ success: false, message: 'Comment content is required.' });
  }

  try {
    const comment = await Comment.create({
      blogId,
      userId: req.user.id,
      userName: req.user.name,
      content,
    });

    res.status(201).json({ success: true, message: 'Comment added', data: comment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const getCommentsByBlogId = async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Comment not found or not authorized' });
    }

    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
