// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// File: backendNew/src/services/blog.service.js


import Blog from '../models/blog.model.js';

const getAllBlogs = async () => await Blog.find();
const getBlogById = async (id) => await Blog.findById(id);
const addBlog = async (data) => await Blog.create(data);
const updateBlog = async (id, data) => await Blog.findByIdAndUpdate(id, data, { new: true });
const deleteBlog = async (id) => await Blog.findByIdAndDelete(id);

export { getAllBlogs, getBlogById, addBlog, updateBlog, deleteBlog };
