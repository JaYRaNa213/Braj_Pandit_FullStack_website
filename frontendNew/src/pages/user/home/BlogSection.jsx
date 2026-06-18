
// 🔐 Enhanced by ChatGPT © 2025 - Jay Rana's Devotional Platform - Premium Blog Section

import React, { useEffect, useState, useRef } from "react";
import { getAllBlogs } from "../../../services/user/blogService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaCalendarAlt, FaUser, FaEye, FaHeart, FaBookOpen } from "react-icons/fa";
import { MdTrendingUp, MdNewReleases } from "react-icons/md";

const BlogSection = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs({ page: 1, limit: 15 });
        setBlogs(res?.data || []);
      } catch (err) {
        console.error("Error fetching blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    const scrollSpeed = 1;
    const interval = 20;

    const startAutoScroll = () => {
      if (!scrollIntervalRef.current) {
        scrollIntervalRef.current = setInterval(() => {
          if (container && !isPaused) {
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
              container.scrollLeft = 0;
            } else {
              container.scrollLeft += scrollSpeed;
            }
          }
        }, interval);
      }
    };

    const stopAutoScroll = () => {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    };

    startAutoScroll();
    return () => stopAutoScroll();
  }, [isPaused]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const LoadingSkeleton = () => (
    <div className="min-w-[320px] max-w-[320px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-orange-100 dark:border-gray-700 p-6 animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16" />
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-20" />
      </div>
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded" />
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 dark:bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-200/20 dark:bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-100/10 to-yellow-100/10 dark:from-yellow-500/5 dark:to-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-32 left-20 text-4xl text-orange-300/30 dark:text-yellow-500/20"
          animate={{ y: [0, -20, 0], rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          📚
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-32 text-3xl text-yellow-400/30 dark:text-orange-400/20"
          animate={{ y: [0, 20, 0], rotate: [0, -360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          ✍️
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between mb-16"
        >
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <FaBookOpen className="text-white text-xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              {t("homeblog.heading")}
            </h2>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <MdNewReleases className="text-white text-xl" />
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/blogs"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>{t("view_more")}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Blog Cards Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
            onTouchStart={handlePause}
            onTouchEnd={handleResume}
          >
            <div className="flex gap-6 px-2 w-fit">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <LoadingSkeleton key={i} />
                ))
              ) : (
                blogs.map((blog, i) => (
                  <motion.div
                    key={blog?._id || i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group min-w-[320px] max-w-[320px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 dark:hover:shadow-yellow-500/20 transition-all duration-500"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800">
                      <motion.img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        whileHover={{ scale: 1.1 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Trending Badge */}
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                        <MdTrendingUp />
                        Latest
                      </div>

                      {/* Read Time */}
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-orange-600 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        5 min read
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20">
                          <FaHeart size={12} />
                        </button>
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20">
                          <FaEye size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaUser className="text-orange-500" />
                          <span>Admin</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-orange-500" />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
                        {blog.description || blog.content?.substring(0, 100) + "..."}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-medium">
                          Spirituality
                        </span>
                        <span className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                          Devotion
                        </span>
                      </div>

                      {/* Read More Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to={`/blogs/${blog._id}`}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <span>{t("homeblog.read_more")}</span>
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-orange-300 dark:bg-orange-600 opacity-50"
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Explore Spiritual Wisdom
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Discover ancient wisdom and modern spiritual insights through our curated blog collection
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/blogs"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mx-auto w-fit"
              >
                <span>Read All Blogs</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
