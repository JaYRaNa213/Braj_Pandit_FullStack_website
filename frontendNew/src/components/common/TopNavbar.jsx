
// 🔐 Redesigned by ChatGPT © 2025 - Jay Rana's Devotional Platform

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaFacebookF, FaPhone, FaEnvelope } from "react-icons/fa";
import { MdClose, MdLanguage } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const TopNavbar = () => {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [animateClose, setAnimateClose] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleClose = () => {
    setAnimateClose(true);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ 
          opacity: animateClose ? 0 : 1, 
          y: animateClose ? -50 : 0,
          scale: animateClose ? 0.95 : 1
        }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="sticky top-0 w-full z-50 shadow-xl backdrop-blur-sm
        bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        text-white font-inter border-b border-orange-300/20"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 z-10 p-2 rounded-full
          bg-white/10 hover:bg-white/20 text-white hover:text-yellow-300 
          transition-all duration-300 backdrop-blur-sm group"
          aria-label="Close"
        >
          <MdClose className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Desktop View */}
          <div className="hidden lg:flex items-center justify-between">
            {/* Left: Contact Info */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm">
                <FaPhone className="w-4 h-4 text-yellow-300" />
                <span className="font-medium">+91 8979923233</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FaEnvelope className="w-4 h-4 text-yellow-300" />
                <span className="font-medium">info@merovrindavan.in</span>
              </div>
            </div>

            {/* Center: Special Offer */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-orange-900 
              px-6 py-2 rounded-full font-bold text-sm shadow-lg transform hover:scale-105 transition-all duration-300">
                ✨ {t("topbar.rudrabhishek_offer") || "Rudrabhishek Group Puja (E-puja - ₹201)"}
              </div>
              <Link
                to="/booking"
                className="bg-white text-orange-600 hover:bg-yellow-100 
                font-bold text-sm px-6 py-2 rounded-full shadow-lg 
                transform hover:scale-105 transition-all duration-300 
                border-2 border-transparent hover:border-yellow-300"
              >
                🕉️ {t("topbar.book_now") || "Book Now"}
              </Link>
            </div>

            {/* Right: Actions & Social */}
            <div className="flex items-center space-x-4">
              <Link
                to="/be-a-pandit"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white 
                hover:from-yellow-600 hover:to-orange-600 font-semibold text-sm 
                px-5 py-2 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
              >
                🙏 {t("topbar.be_a_pandit") || "Be a Pandit"}
              </Link>

              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <MdLanguage className="w-4 h-4" />
                <span>{i18n.language === "en" ? "हिंदी" : "English"}</span>
              </button>

              <div className="flex items-center space-x-3">
                <a
                  href="https://www.instagram.com/vedagyanam_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition-all duration-300 transform hover:scale-110"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@vedagyanam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Tablet View */}
          <div className="hidden md:flex lg:hidden flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <FaPhone className="w-4 h-4 text-yellow-300" />
                <span>+91 8979923233</span>
              </div>
              <div className="flex items-center space-x-3">
                <a href="https://www.instagram.com/vedagyanam_official" target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition-all duration-300">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com/@vedagyanam" target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-full bg-white/10 hover:bg-red-500 transition-all duration-300">
                  <FaYoutube className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-full bg-white/10 hover:bg-blue-500 transition-all duration-300">
                  <FaFacebookF className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-orange-900 
              px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                ✨ Rudrabhishek Group Puja (₹201)
              </div>
              <Link to="/booking" className="bg-white text-orange-600 hover:bg-yellow-100 
              font-bold text-sm px-4 py-2 rounded-full shadow-lg transition-all duration-300">
                🕉️ Book Now
              </Link>
            </div>
          </div>

          {/* Mobile View */}
          <div className="flex md:hidden flex-col space-y-3 items-center text-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-orange-900 
            px-4 py-2 rounded-full font-bold text-xs shadow-lg">
              ✨ {t("topbar.rudrabhishek_offer") || "Rudrabhishek Group Puja (₹201)"}
            </div>
            <Link
              to="/booking"
              className="bg-white text-orange-600 hover:bg-yellow-100 
              font-bold text-xs px-6 py-2 rounded-full shadow-lg transition-all duration-300"
            >
              🕉️ {t("topbar.book_now") || "Book Now"}
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TopNavbar;
