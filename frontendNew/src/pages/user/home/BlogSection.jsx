// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState, useRef } from "react";
import { getAllBlogs } from "../../../services/user/blogService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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

  return (
    <section className="w-full py-16 px-4 bg-[#fff8f0] dark:bg-[#1c1c1c]">
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-700 dark:text-orange-300">
          {t("homeblog.heading")}
        </h2>
        <Link
          to="/blogs"
          className="text-sm text-orange-600 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-100 font-medium"
        >
          {t("view_more")} →
        </Link>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto hide-scrollbar"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        <div className="flex gap-4 px-2 w-fit">
          {(loading ? Array.from({ length: 6 }) : blogs).map((blog, i) => (
            <motion.div
              key={blog?._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="min-w-[160px] max-w-[160px] bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-500 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer p-2 flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-300 shadow mb-2">
                {loading ? (
                  <div className="w-full h-full bg-gray-300 animate-pulse" />
                ) : (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="text-[13px] font-semibold text-orange-800 dark:text-orange-300 text-center line-clamp-2">
                {blog?.title || "Loading..."}
              </h3>
              {!loading && (
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-[11px] text-orange-600 hover:underline mt-1 dark:text-orange-400"
                >
                  {t("homeblog.read_more")}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;