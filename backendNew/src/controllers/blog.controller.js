// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/controllers/blog.controller.js

import Blog from '../models/blog.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// ✅ Get all blogs with search, category filter, and multilingual search
export const getAllBlogs = async (req, res) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000;
    const lang = req.query.lang || "en"; // 'en' or 'hi'

    const query = {
      [`title.${lang}`]: { $regex: search, $options: "i" },
    };

    if (category) {
      query[`category.${lang}`] = category;
    }

    const skip = (page - 1) * limit;

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(query);

    return res.status(200).json({
      data: blogs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
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

// ✅ Add a new blog with multilingual support
export const addBlog = async (req, res) => {
  try {
    const { title, content, author, category } = req.body;

    if (!title || !content || !author || !req.file) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const uploadResult = await uploadOnCloudinary(req.file.path);
    if (!uploadResult?.secure_url) {
      return res.status(400).json({ success: false, message: 'Image upload failed' });
    }

    const blog = await Blog.create({
      title: {
        en: title.en,
        hi: title.hi || '',
      },
      content: {
        en: content.en,
        hi: content.hi || '',
      },
      author,
      category: {
        en: category.en,
        hi: category.hi || '',
      },
      imageUrl: uploadResult.secure_url,
      createdBy: req.user?.id || null,
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update blog with multilingual fields
export const updateBlog = async (req, res) => {
  try {
    let updatedData = {
      updatedBy: req.user?.id || "admin",
    };

    const { title, content, category, author } = req.body;

    if (title) {
      updatedData.title = {
        en: title.en,
        hi: title.hi || '',
      };
    }

    if (content) {
      updatedData.content = {
        en: content.en,
        hi: content.hi || '',
      };
    }

    if (category) {
      updatedData.category = {
        en: category.en,
        hi: category.hi || '',
      };
    }

    if (author) updatedData.author = author;

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      updatedData.imageUrl = cloudinaryResponse?.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating blog', error: error.message });
  }
};

// ✅ Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting blog', error: error.message });
  }
};
