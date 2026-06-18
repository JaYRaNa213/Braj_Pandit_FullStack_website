// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import Blog from '../models/blog.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// ✅ Get all blogs with search, category filter, and multilingual search
export const getAllBlogs = async (req, res) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000;
    const lang = req.query.lang || "en";

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
    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching blog", error: error.message });
  }
};

// ✅ Add new blog
export const addBlog = async (req, res) => {
  try {
    const titleEn = req.body['title.en'];
    const titleHi = req.body['title.hi'];
    const contentEn = req.body['content.en'];
    const contentHi = req.body['content.hi'];
    const author = req.body.author;
    const categoryEn = req.body['category.en'];
    const categoryHi = req.body['category.hi'];
    const imageUrl = req.body.imageUrl;

    // Basic validation
    if (!titleEn || !contentEn || !author || !categoryEn) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let finalImageUrl = '';

    // Upload from file (multipart)
    if (req.files && req.files.length > 0) {
      const imageFile = req.files.find((file) => file.fieldname === 'image');
      if (imageFile) {
        const cloudinaryRes = await uploadOnCloudinary(imageFile.path);
        if (!cloudinaryRes?.secure_url) {
          return res.status(500).json({ message: 'Cloudinary upload failed' });
        }
        finalImageUrl = cloudinaryRes.secure_url;
      }
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const blog = await Blog.create({
      title: { en: titleEn, hi: titleHi || '' },
      content: { en: contentEn, hi: contentHi || '' },
      author,
      category: { en: categoryEn, hi: categoryHi || '' },
      imageUrl: finalImageUrl,
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

// ✅ Update blog
export const updateBlog = async (req, res) => {
  try {
    const titleEn = req.body['title.en'];
    const titleHi = req.body['title.hi'];
    const contentEn = req.body['content.en'];
    const contentHi = req.body['content.hi'];
    const author = req.body.author;
    const categoryEn = req.body['category.en'];
    const categoryHi = req.body['category.hi'];
    const imageUrl = req.body.imageUrl;

    let updatedData = {
      updatedBy: req.user?.id || "admin",
    };

    if (titleEn || titleHi) {
      updatedData.title = {
        en: titleEn,
        hi: titleHi || '',
      };
    }

    if (contentEn || contentHi) {
      updatedData.content = {
        en: contentEn,
        hi: contentHi || '',
      };
    }

    if (categoryEn || categoryHi) {
      updatedData.category = {
        en: categoryEn,
        hi: categoryHi || '',
      };
    }

    if (author) updatedData.author = author;

    // Image handling
    let finalImageUrl = '';

    if (req.files && req.files.length > 0) {
      const imageFile = req.files.find((file) => file.fieldname === 'image');
      if (imageFile) {
        const cloudinaryRes = await uploadOnCloudinary(imageFile.path);
        if (!cloudinaryRes?.secure_url) {
          return res.status(500).json({ message: 'Cloudinary upload failed' });
        }
        finalImageUrl = cloudinaryRes.secure_url;
      }
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    }

    if (finalImageUrl) {
      updatedData.imageUrl = finalImageUrl;
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
