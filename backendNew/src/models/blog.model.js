// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    // 🔤 Multilingual Title
    title: {
      en: { type: String, required: true, trim: true },
      hi: { type: String, trim: true },
    },

    // 📝 Multilingual Content
    content: {
      en: { type: String, required: true },
      hi: { type: String },
    },

    // 👤 Author Name
    author: { type: String, required: true, trim: true },

    // 🏷️ Tags
    tags: { type: [String], default: [] },

    // 📚 Multilingual Category
    category: {
      en: {
        type: String,
        enum: [
          'Puja',
          'Festival',
          'Religious Books',
          'Places',
          'Mandir',
          'Knowledge',
          'Aarti',
          'Other Religious Blogs',
        ],
        default: 'Puja',
        required: true,
      },
      hi: {
        type: String,
        default: '',
      },
    },

    // 🖼️ Blog Image
    imageUrl: { type: String },

    // 📅 Publishing Date
    publishedAt: { type: Date, default: Date.now },

    // 💬 Comments Array
    Comments: [
      {
        user: { type: String },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // 🧑 Creator
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // 🛠️ Last Updater
    updatedBy: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
