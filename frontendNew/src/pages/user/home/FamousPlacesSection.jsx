
// 🔐 Enhanced by ChatGPT © 2025 - Jay Rana's Devotional Platform - Premium Famous Places Section

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaArrowRight, FaGlobe, FaEye, FaHeart, FaCamera } from "react-icons/fa";
import { MdTrendingUp, MdLocationOn, MdExplore } from "react-icons/md";
import famousPlacesData from "../../../data/famousPlaces.json";

const FamousPlacesSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const openMap = (url) => window.open(url, "_blank");

  useEffect(() => {
    const container = scrollRef.current;
    const scrollSpeed = 1;
    const scrollInterval = 20;

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
        }, scrollInterval);
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
          🛕
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-32 text-3xl text-yellow-400/30 dark:text-orange-400/20"
          animate={{ y: [0, 20, 0], rotate: [0, -360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          🌺
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
              <MdLocationOn className="text-white text-xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              {t("famous_places_title")}
            </h2>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <MdExplore className="text-white text-xl" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-gray-600 hover:bg-orange-50 dark:hover:bg-gray-700 font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGlobe />
              <span>{i18n.language === "en" ? "हिंदी" : "English"}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Places Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
            onTouchStart={handlePause}
            onTouchEnd={handleResume}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex gap-6 px-2 w-fit"
            >
              {famousPlacesData.mandirs.map((place, index) => (
                <motion.div
                  key={place.key}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group min-w-[300px] max-w-[300px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 dark:hover:shadow-yellow-500/20 transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800">
                    <motion.img
                      src={t(`HomePlace.url.${place.key}`)}
                      alt={t(`HomePlace.Name.${place.key}`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      whileHover={{ scale: 1.1 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Popular Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                      <MdTrendingUp />
                      Sacred Place
                    </div>

                    {/* Distance Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-orange-600 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      <FaMapMarkerAlt className="inline mr-1" />
                      Vrindavan
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20">
                        <FaHeart size={12} />
                      </button>
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20">
                        <FaCamera size={12} />
                      </button>
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20">
                        <FaEye size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1">
                        {t(`HomePlace.Name.${place.key}`)}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                      {t(`HomePlace.description.${place.key}`)}
                    </p>

                    {/* Features */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-orange-500" />
                        <span>Historical</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye className="text-orange-500" />
                        <span>Must Visit</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCamera className="text-orange-500" />
                        <span>Photo Spot</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          openMap(t(`HomePlace.location.${place.key}`));
                        }}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaMapMarkerAlt size={12} />
                        <span>{t("view_on_map")}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaEye size={12} />
                        <span>Visit</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${hoveredCard === index ? 'animate-pulse' : ''}`} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(5)].map((_, i) => (
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
              Discover Sacred Heritage
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore the divine beauty and rich history of Vrindavan's most sacred temples and locations
            </p>
            <motion.button
              onClick={() => navigate("/famous-places")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t("view_more")}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FamousPlacesSection;
