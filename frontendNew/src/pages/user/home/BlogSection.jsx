// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../services/user/blogService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const BlogSection = () => {
  const { t } = useTranslation();
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
      reset ? setBlogs(blogList) : setBlogs((prev) => [...prev, ...blogList]);

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

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-12 bg-orange-100 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-orange-700 dark:text-yellow-400">
            {t("homeblog.heading")}
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-orange-300 bg-white dark:bg-gray-800 dark:text-gray-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-400 transition-all"
            >
              <option value="">{t("homeblog.all_categories")}</option>
              <option value="Festivals">{t("homeblog.festivals")}</option>
              <option value="Spirituality">{t("homeblog.spirituality")}</option>
              <option value="Culture">{t("homeblog.culture")}</option>
              <option value="Devotion">{t("homeblog.devotion")}</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-orange-300 bg-white dark:bg-gray-800 dark:text-gray-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-400 transition-all"
            >
              <option value="latest">{t("homeblog.latest")}</option>
              <option value="oldest">{t("homeblog.oldest")}</option>
            </select>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading && blogs.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl p-6 h-80 col-span-1"
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
                  className="bg-white dark:bg-gray-800 border-2 border-yellow-400 dark:border-orange-400 shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02] rounded-xl flex flex-col items-center text-center p-4"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-300 shadow-lg mb-4">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2 line-clamp-3">
                    {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                  </p>

                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-orange-700 dark:text-orange-400 font-semibold hover:underline text-sm"
                  >
                    {t("homeblog.read_more")}
                  </Link>
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
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-orange-200"
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
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 text-base sm:text-lg font-semibold transition"
          >
            {t("homeblog.view_more")}
          </Link>
        </div>

        {/* No Blogs */}
        {!loading && blogs.length === 0 && (
          <div className="mt-10 text-center text-gray-500 dark:text-gray-300">
            {t("homeblog.no_blogs")}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
