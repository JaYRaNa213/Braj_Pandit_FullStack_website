import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "@/services/user/blogService";
import { useTranslation } from "react-i18next";

const BlogDetails = () => {
  const { t, i18n } = useTranslation();
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
        {t("blog_details.loading")}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-10 text-center text-red-600 dark:text-red-400">
        {t("blog_details.not_found")}
      </div>
    );
  }

  // 🔄 Handle both multilingual and plain string format
  const title =
    typeof blog.title === "string"
      ? blog.title
      : blog.title?.[i18n.language] || blog.title?.en;

  const content =
    typeof blog.content === "string"
      ? blog.content
      : blog.content?.[i18n.language] || blog.content?.en;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white dark:bg-gray-900 dark:text-white rounded shadow-md">
      {/* Blog Image */}
      <img
        src={blog.imageUrl || "https://via.placeholder.com/600x400?text=No+Image"}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
        }}
      />

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-red-700 dark:text-yellow-400 mb-2">
        {title}
      </h1>

      {/* Meta Info */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {t("blog_details.by")}{" "}
        <span className="font-medium">{blog.author || t("blog_details.admin")}</span>{" "}
        • {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
      </p>

      {/* Blog Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Back to Blogs Button */}
      <div className="mt-10 text-center">
        <Link
          to="/blogs"
          className="inline-block px-6 py-2 border-2 border-red-700 text-red-700 rounded-full hover:bg-red-700 hover:text-white transition font-semibold"
        >
          ← {t("blog_details.back_to_blogs")}
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
