// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "@/services/user/blogService";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res.data);
      } catch (err) {
        console.error("❌ Failed to load blog:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600 dark:text-gray-300 animate-pulse">
        Loading blog details...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-10 text-center text-red-600 dark:text-red-400">
        Blog not found or something went wrong.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white dark:bg-gray-900 dark:text-white rounded shadow-md">
      {/* Blog Image */}
      <img
        src={blog.imageUrl || "https://via.placeholder.com/600x400?text=No+Image"}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
        }}
      />

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-red-700 dark:text-yellow-400 mb-2">
        {blog.title}
      </h1>

      {/* Meta */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        By <span className="font-medium">{blog.author || "Admin"}</span> •{" "}
        {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
      </p>

      {/* Blog Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Back Button */}
      <div className="mt-10 text-center">
        <Link
          to="/blogs"
          className="inline-block px-6 py-2 border-2 border-red-700 text-red-700 rounded-full hover:bg-red-700 hover:text-white transition font-semibold"
        >
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
