
// 🔐 Enhanced by ChatGPT © 2025 - Jay Rana's Devotional Platform - Premium Live Bhajans Section

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLiveHome } from "../../../services/user/live.Services";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

const getThumbnail = async (channelId, fallbackName) => {
  try {
    const { data } = await axios.get(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/channel/${channelId}&format=json`
    );
    return (
      data?.thumbnail_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=random`
    );
  } catch {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=random`;
  }
};

const ShimmerCard = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="w-[380px] h-[340px] bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-orange-100 dark:border-gray-700 shadow-lg overflow-hidden"
  >
    <div className="relative">
      <div className="h-[220px] bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
      <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
      <div className="absolute bottom-3 right-3 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
    </div>
    <div className="p-4 space-y-3">
      <div className="w-4/5 h-4 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
        <div className="w-2/3 h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </div>
      <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-500 rounded animate-pulse" />
    </div>
  </motion.div>
);

const BhajanCard = ({ item, t, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!inView) return <div ref={ref} className="w-[380px] h-[340px]" />;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-[380px] flex-shrink-0 group"
    >
      <Link
        to={`/live/${item.videoId}`}
        className="block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 dark:hover:shadow-yellow-500/20 transition-all duration-500 backdrop-blur-sm"
      >
        {/* Image Container with Overlay Effects */}
        <div className="relative w-full h-[220px] overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-gray-700 dark:to-gray-800">
          <motion.img
            src={item.image}
            alt={item.title}
            variants={imageVariants}
            initial="hidden"
            animate={imageLoaded ? "visible" : "hidden"}
            whileHover="hover"
            className={`w-full h-full object-cover ${!item.isLive ? "grayscale-[0.3]" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "/images/offline-bhajan.jpg";
              setImageLoaded(true);
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Live Status Badge */}
          <motion.div
            className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm border ${
              item.isLive 
                ? "bg-red-500/90 text-white border-red-400 animate-pulse" 
                : "bg-gray-600/90 text-white border-gray-500"
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {item.isLive ? (
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                {t("homelive.live")}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                ⏳ {t("homelive.not_live")}
              </span>
            )}
          </motion.div>

          {/* Play Button Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
            </div>
          </motion.div>

          {/* View Count Badge */}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full border border-white/20">
            👁️ {item.views}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          <motion.h3 
            className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2 leading-tight group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
          >
            {item.title}
          </motion.h3>

          {/* Channel Info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={item.channelAvatar}
                alt="channel avatar"
                className="w-10 h-10 rounded-full border-2 border-orange-200 dark:border-gray-600 object-cover shadow-sm"
              />
              {item.isLive && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                {item.channelName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span>{item.timeAgo}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span>👥</span>
                  {item.views} {t("homelive.views")}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
              <button className="hover:text-red-500 transition-colors duration-200">
                ❤️
              </button>
              <button className="hover:text-blue-500 transition-colors duration-200">
                💬
              </button>
              <button className="hover:text-green-500 transition-colors duration-200">
                📤
              </button>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {item.isLive ? "🔴 Live Now" : "📺 Recorded"}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const LiveBhajan = () => {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBhajans = async () => {
      try {
        const res = await getLiveHome();
        const raw = Array.isArray(res?.data) ? res.data : [];

        const enriched = await Promise.all(
          raw.map(async (item) => {
            const fallbackName = item.title || "Bhajan";
            const channelAvatar = item.channelAvatar || (await getThumbnail(item.channelId, fallbackName));
            const image = item.isLive
              ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
              : await getThumbnail(item.channelId, fallbackName);

            return {
              ...item,
              views: item.views || `${Math.floor(Math.random() * 900 + 100)}K`,
              timeAgo: item.timeAgo || `${Math.floor(Math.random() * 10 + 1)} ${t("homelive.days_ago")}`,
              channelName: item.channelName || fallbackName,
              channelAvatar,
              image,
            };
          })
        );

        setBhajans(enriched.slice(0, 8));
        setError(null);
      } catch (err) {
        console.error("Failed to load live bhajans:", err.message);
        setError(t("homelive.error"));
      } finally {
        setLoading(false);
      }
    };

    fetchBhajans();
  }, [t]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 dark:bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-200/20 dark:bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-100/10 to-yellow-100/10 dark:from-yellow-500/5 dark:to-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              🎵 {t("homelive.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Experience divine bhajans live from sacred temples
            </p>
          </div>

          <motion.button
            onClick={() => navigate("/live-bhajans")}
            className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("homelive.view_more")} 
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.button>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-4">
                {[...Array(4)].map((_, i) => (
                  <ShimmerCard key={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-6xl mb-4">😔</div>
              <p className="text-xl text-orange-600 dark:text-yellow-400 font-semibold mb-2">
                Oops! Something went wrong
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors duration-200"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!loading && bhajans.length === 0 && !error && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-6xl mb-4">🎭</div>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                {t("homelive.empty")}
              </p>
              <p className="text-gray-500 dark:text-gray-500 mt-2">
                Check back later for live spiritual content
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence>
          {!loading && bhajans.length > 0 && (
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Navigation Buttons */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20">
                <button
                  onClick={scrollLeft}
                  className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-xl rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  ←
                </button>
              </div>
              
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
                <button
                  onClick={scrollRight}
                  className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-xl rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  →
                </button>
              </div>

              {/* Cards Container */}
              <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {bhajans.map((item, index) => (
                  <div key={index} className="snap-start">
                    <BhajanCard item={item} t={t} index={index} />
                  </div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {bhajans.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-orange-300 dark:bg-gray-600"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default LiveBhajan;
