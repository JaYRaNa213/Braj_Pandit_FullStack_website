// src/controllers/blog.controller.js

import Blog from '../models/blog.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// ✅ Get all blogs (User) with search and limit
export const getAllBlogs = async (req, res) => {
  try {
    const search = req.query.search || '';
    const blogs = await Blog.find({
      title: { $regex: search, $options: 'i' }
    }).limit(10);

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching blogs', error: error.message });
  }
};

// ✅ Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching blog', error: error.message });
  }
};

// ✅ Add a new blog (Admin only)
export const addBlog = async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      imageUrl = cloudinaryResponse?.secure_url;
    }

    const blog = new Blog({
      ...req.body,
      imageUrl,
      createdBy: req.user.id
    });

    await blog.save();
    res.status(201).json({ success: true, message: 'Blog added successfully', data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error adding blog', error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    let updatedData = {
      ...req.body,
      updatedBy: req.user.id,
    };

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      updatedData.imageUrl = cloudinaryResponse?.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, message: 'Blog updated successfully', data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating blog', error: error.message });
  }
};


// ✅ Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting blog', error: error.message });
  }
};
