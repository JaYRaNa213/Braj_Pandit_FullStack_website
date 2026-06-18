
// 🔐 Enhanced by ChatGPT © 2025 - Jay Rana's Devotional Platform - Premium PujaServices Section

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt, FaUsers, FaClock, FaRupeeSign, FaArrowRight, FaOm } from "react-icons/fa";
import { MdVerified, MdTrendingUp } from "react-icons/md";
import pujaData from "../../../data/pujaServices.json";

const PujaServices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setServices(pujaData.slice(0, 6)); // Show 6 services in 2 rows of 3
  }, []);

  const handleBookNow = (serviceTitle) => {
    const encoded = encodeURIComponent(serviceTitle);
    navigate(`/puja-details?service=${encoded}`);
  };

  const handleViewMore = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate("/all-puja-services");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
    <Element name="pujaServicesSection">
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 dark:bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-200/20 dark:bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-100/10 to-yellow-100/10 dark:from-yellow-500/5 dark:to-orange-500/5 rounded-full blur-3xl" />
        </div>

        {/* Floating Om Symbols */}
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
                <FaOm className="text-white text-xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                {t("pujas.heading") || "Sacred Puja Services"}
              </h2>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <MdVerified className="text-white text-xl" />
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience divine blessings through our authentic Vedic puja services performed by verified scholars
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 dark:hover:shadow-yellow-500/20 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    <MdTrendingUp className="inline mr-1" />
                    Popular
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-orange-600 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    <FaRupeeSign className="inline mr-1" />
                    On Request
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {service.desc}
                  </p>

                  {/* Features */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <FaClock className="text-orange-500" />
                      <span>2-3 Hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-orange-500" />
                      <span>Group Puja</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-orange-500" />
                      <span>Book Now</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={() => handleBookNow(service.title)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t("pujas.book_now") || "Book Sacred Puja"}</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${hoveredCard === idx ? 'animate-pulse' : ''}`} />
              </motion.div>
            ))}
          </motion.div>

          {/* View More Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Explore More Sacred Services
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Discover our complete range of Vedic puja services and spiritual ceremonies
              </p>
              <motion.button
                onClick={handleViewMore}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t("pujas.view_more") || "View All Services"}</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </Element>
  );
};

export default PujaServices;
