
// 🔐 Redesigned by ChatGPT © 2025 - Jay Rana's Devotional Platform

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = ({ onAllEPujasClick, onSeeServicesClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Array of background images for rotation
  const backgroundImages = [
    "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917524/IMG20250619193232_zilsdz.jpg",
    "https://res.cloudinary.com/djtq2eywl/image/upload/v1751620820/logo_yre5xd.png",
    "https://images.unsplash.com/photo-1516937080664-ed2fc6a32937?w=1200",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200"
  ];

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
    
    // Image rotation effect
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAllEPujasClick = () => {
    navigate("/all-e-pujas");
  };

  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background Images */}
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center z-10"
          style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-orange-900/30 to-black/80 z-20" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-25 pointer-events-none">
        {/* Floating Om Symbol */}
        <motion.div 
          className="absolute top-20 left-10 text-6xl text-yellow-400/20"
          variants={floatingVariants}
          animate="animate"
        >
          🕉️
        </motion.div>
        
        {/* Floating Lotus */}
        <motion.div 
          className="absolute top-40 right-20 text-5xl text-orange-400/20"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
        >
          🪷
        </motion.div>

        {/* Floating Diya */}
        <motion.div 
          className="absolute bottom-32 left-20 text-4xl text-yellow-500/20"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
        >
          🪔
        </motion.div>

        {/* Floating Temple */}
        <motion.div 
          className="absolute bottom-40 right-10 text-5xl text-orange-300/20"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "3s" }}
        >
          🛕
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-30 flex items-center justify-center h-full px-6 sm:px-10">
        <motion.div
          className="max-w-4xl w-full"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          {/* Glassmorphism Content Card */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-black/40 via-orange-900/20 to-black/40 rounded-3xl border border-white/10 shadow-2xl p-8 sm:p-12 text-center text-white space-y-8 relative overflow-hidden">
            
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-yellow-400/5 to-orange-400/5 rounded-3xl blur-xl" />
            
            <motion.div variants={itemVariants} className="relative z-10">
              <p className="text-sm sm:text-base tracking-[0.3em] uppercase text-yellow-400 font-bold mb-2 opacity-90">
                {t("hero.welcome")}
              </p>
              
              {/* Decorative Line */}
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-6" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight sm:leading-snug text-white relative z-10"
            >
              <span className="inline-block">
                {t("hero.headline_line1")}{" "}
              </span>
              <span className="inline-block bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
                {t("hero.headline_trusted")}
              </span>{" "}
              <span className="inline-block">
                {t("hero.headline_line2")}{" "}
              </span>
              <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                {t("hero.headline_ceremonies")}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-200 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed relative z-10"
            >
              {t("hero.description")}
            </motion.p>

            {/* Enhanced Button Container */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 relative z-10"
            >
              <motion.button
                onClick={onSeeServicesClick}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white font-bold text-lg rounded-full shadow-2xl transition-all duration-300 border border-orange-400/50 overflow-hidden min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🙏 {t("hero.puja_booking")}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </motion.button>

              <motion.button
                onClick={handleAllEPujasClick}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-700 text-black font-bold text-lg rounded-full shadow-2xl transition-all duration-300 border border-yellow-400/50 overflow-hidden min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  ✨ {t("hero.all_E_pujas")}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-300 relative z-10"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Verified Pandits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
