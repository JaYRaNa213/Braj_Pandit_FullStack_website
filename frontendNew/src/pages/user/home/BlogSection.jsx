// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../services/user/blogService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("");

  const blogsPerPage = 4;

  useEffect(() => {
    fetchBlogs(1, true);
  }, [sortBy, category]);

  const fetchBlogs = async (pageNum, reset = false) => {
    try {
      setLoading(true);
      const res = await getAllBlogs({
        page: pageNum,
        limit: blogsPerPage,
        sortBy,
        category,
      });

      const blogList = res?.data || [];
      if (reset) {
        setBlogs(blogList);
      } else {
        setBlogs((prev) => [...prev, ...blogList]);
      }

      setTotalPages(Math.ceil((res?.total || 0) / blogsPerPage));
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (num) => {
    fetchBlogs(num, true);
  };

  const isLatest = (date) => {
    const daysDiff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
    return daysDiff < 10;
  };

  const getReadingTime = (content = "") =>
    Math.ceil(content.split(" ").length / 200);

  return (
    <section className="w-full max-w-6xl mb-16 px-4 mx-auto bg-orange-100 py-10 rounded-xl">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h2 className="text-4xl font-bold text-orange-700">Our Blogs</h2>
        <div className="flex gap-3 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-orange-300 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-400 transition-all"
          >
            <option value="">All Categories</option>
            <option value="Festivals">Festivals</option>
            <option value="Spirituality">Spirituality</option>
            <option value="Culture">Culture</option>
            <option value="Devotion">Devotion</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-orange-300 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-400 transition-all"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading && blogs.length === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 animate-pulse rounded-xl p-6 h-80"
              >
                <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 mb-2 w-2/4"></div>
                <div className="h-3 bg-gray-300 w-1/3"></div>
              </div>
            ))
          : blogs.map((blog, i) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02] flex flex-col overflow-hidden"
              >
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {blog.title}
                    </h3>
                    {isLatest(blog.createdAt) && (
                      <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    By {blog.author || "Admin"} •{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mt-2 mb-2 text-sm line-clamp-3">
                    {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2 text-xs">
                    <span className="bg-orange-200 text-orange-800 px-2 py-0.5 rounded">
                      #{blog.category || "General"}
                    </span>
                    <span className="text-gray-500 ml-auto">
                      {getReadingTime(blog.content)} min read
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-auto">
                    <span>{blog.views || 0} Views</span>
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-orange-700 font-semibold hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                page === idx + 1
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-orange-200"
              } transition duration-200`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* View More */}
      <div className="flex justify-center mt-8">
        <Link
          to="/blogs"
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 text-lg font-semibold transition"
        >
          View More →
        </Link>
      </div>

      {/* No Blogs */}
      {!loading && blogs.length === 0 && (
        <div className="mt-10 text-center text-gray-500">No blogs found.</div>
      )}
    </section>
  );
};

export default BlogSection;
