
// 🔐 Enhanced by ChatGPT © 2025 - Jay Rana's Devotional Platform - Premium Verified Pandits Section

import React, { useEffect, useState } from "react";
import { getAllPandits } from "../../../services/user/panditService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar,  FaCalendarAlt, FaPhone, FaArrowRight, FaOm, FaUserGraduate } from "react-icons/fa";
import { MdVerified, MdTrendingUp,MdWork } from "react-icons/md";

// Util: Generate rating based on localStorage click count
const getRating = (name) => {
  const count = parseInt(localStorage.getItem(`clicks_${name}`)) || 0;
  return Math.min((count / 10).toFixed(1), 5);
};

// Util: Increment click count for rating logic
const incrementClick = (name) => {
  const key = `clicks_${name}`;
  const prev = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, prev + 1);
};

// Render stars based on rating value
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1">
      {Array(full).fill().map((_, i) => (
        <FaStar key={`f-${i}`} className="text-yellow-400 text-sm" />
      ))}
      {half && <FaStar className="text-yellow-400 text-sm opacity-50" />}
      {Array(empty).fill().map((_, i) => (
        <FaStar key={`e-${i}`} className="text-gray-300 text-sm" />
      ))}
      <span className="text-xs text-gray-500 ml-1">({rating})</span>
    </div>
  );
};

// Build full image URL or fallback
const getPanditImageUrl = (url) => {
  if (!url) return "/default-pandit.png";
  return url.startsWith("http") ? url : `http://localhost:7000/${url}`;
};

const VerifiedPanditJis = () => {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await getAllPandits();
        const verified = res?.data?.filter(p => p.status?.toLowerCase() === "approved");
        const withRatings = (verified || []).map(p => ({
          ...p,
          rating: parseFloat(getRating(p.name)),
        }));
        const sorted = withRatings.sort((a, b) => b.rating - a.rating);
        setPandits(sorted.slice(0, 8)); // 2 rows x 4 cards
      } catch (err) {
        console.error("Error fetching pandits", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPandits();
  }, []);

  const handleBookPandit = (name) => {
    incrementClick(name);
    navigate(`/puja-booking?pandit=${encodeURIComponent(name)}&service=${encodeURIComponent("Bhagwat Katha")}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="w-full h-40 bg-gray-300 rounded-xl mb-4" />
                <div className="h-4 bg-gray-300 rounded mb-2" />
                <div className="h-3 bg-gray-300 rounded mb-2" />
                <div className="h-3 bg-gray-300 rounded mb-4" />
                <div className="h-8 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          🕉️
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-32 text-3xl text-yellow-400/30 dark:text-orange-400/20"
          animate={{ y: [0, 20, 0], rotate: [0, -360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          🪔
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <MdVerified className="text-white text-xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              {t("verifiedPandits.title")} <span className="text-red-600 dark:text-red-400">{t("verifiedPandits.topRated")}</span> {t("verifiedPandits.panditji")}
            </h2>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <FaUserGraduate className="text-white text-xl" />
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("verifiedPandits.description", "Connect with our most trusted and experienced Vedic scholars for your sacred rituals")}
          </p>
        </motion.div>

        {/* Pandits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {pandits.map((pandit) => (
            <motion.div
              key={pandit._id}
              variants={itemVariants}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 dark:hover:shadow-yellow-500/20 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800">
                <motion.img
                  src={getPanditImageUrl(pandit.imageUrl)}
                  alt={pandit.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => (e.target.src = "/default-pandit.png")}
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Verified Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                  <MdVerified />
                  Verified
                </div>

                {/* Top Rated Badge */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                  <MdTrendingUp />
                  Top Rated
                </div>

                {/* Contact Button (Appears on Hover) */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20">
                    <FaPhone size={14} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1">
                    {pandit.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                  {pandit.expertise}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  {renderStars(pandit.rating)}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MdWork />
                    <span>{pandit.experience}+ yrs</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 h-8">
                  {pandit.bio || t("verifiedPandits.defaultBio", "Vedic scholar with years of experience in puja and astrology. Fluent in Sanskrit.")}
                </p>

                {/* Action Button */}
                <motion.button
                  onClick={() => handleBookPandit(pandit.name)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCalendarAlt size={12} />
                  <span>{t("verifiedPandits.bookNow", "Book Now")}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Meet All Our Verified Scholars
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Discover our complete network of authenticated Vedic pandits and spiritual guides
            </p>
            <motion.button
              onClick={() => navigate("/pandits")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t("verifiedPandits.seeAll", "See All PanditJis")}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerifiedPanditJis;
