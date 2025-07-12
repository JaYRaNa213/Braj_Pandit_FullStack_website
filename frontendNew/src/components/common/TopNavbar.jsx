// 🔐 Redesigned by ChatGPT © 2025 - Jay Rana's Devotional Platform

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { MdClose } from "react-icons/md";

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
    <div
      className={`sticky top-0 w-full px-4 pt-6 pb-3 pr-10 z-50 shadow-md transition-all duration-300
      ${animateClose ? "opacity-0 scale-95 translate-y-[-10px]" : "opacity-100 scale-100"}
      flex flex-col sm:flex-row items-center justify-between gap-4
      bg-gradient-to-r from-[#7b1414] to-[#5d1010] text-white dark:from-[#1a1a1a] dark:to-[#111]
      dark:text-white font-playfair`}
    >
      {/* ❌ Dismiss Button */}
      <button
        onClick={handleClose}
        className="absolute top-1 right-2 sm:top-2 text-white dark:text-white hover:text-yellow-300 text-xl transition"
        aria-label="Close"
      >
        <MdClose />
      </button>

      {/* 🌐 Left: Social + Contact */}
      <div className="flex items-center gap-4 text-lg justify-center sm:justify-start">
        <a
          href="https://www.instagram.com/vedagyanam_official"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 dark:hover:text-yellow-400 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://youtube.com/@vedagyanam"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 dark:hover:text-yellow-400 transition"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 dark:hover:text-yellow-400 transition"
        >
          <FaFacebookF />
        </a>
        <Link
          to="/contact"
          className="text-xs hover:underline font-medium tracking-wide"
        >
          {t("topbar.contact") || "Contact"}
        </Link>
      </div>

      {/* 🎯 Center: Offer + Book Now */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm text-center">
          <span className="px-3 py-1 font-bold text-yellow-300 tracking-wide uppercase shadow-sm">
            {t("topbar.authentic_pandit") || "Authentic Braj Pandit"}
          </span>
          <span className="px-4 py-1 rounded-full border border-white dark:border-[#7b1414] font-semibold whitespace-nowrap bg-white text-[#7b1414] dark:bg-[#7b1414] dark:text-white transition-all shadow-sm">
            {t("topbar.rudrabhishek_offer") || "Rudrabhishek Group Puja (E-puja - ₹201)"}
          </span>
        </div>
        <Link
          to="/booking"
          className="bg-white text-[#7b1414] dark:bg-[#7b1414] dark:text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-full hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-all shadow-md"
        >
          {t("topbar.book_now") || "Book Now"}
        </Link>
      </div>

      {/* 📌 Right: Be a Pandit + About + Lang Toggle */}
      <div className="flex items-center gap-3 text-xs font-medium justify-center sm:justify-end mt-2 sm:mt-0">
        <Link
          to="/be-a-pandit"
          className="bg-white text-[#7b1414] dark:bg-[#7b1414] dark:text-white border border-[#7b1414] dark:border-white px-4 py-2 rounded-full hover:bg-yellow-300 dark:hover:bg-yellow-400 transition shadow-sm"
        >
          {t("topbar.be_a_pandit") || "Be a Pandit"}
        </Link>
        <Link to="/about" className="hover:underline transition">
          {t("topbar.about") || "About Us"}
        </Link>
        <button
          onClick={toggleLanguage}
          className="ml-2 px-3 py-1 rounded-full border border-white dark:border-[#7b1414] bg-transparent dark:bg-transparent hover:bg-yellow-300 dark:hover:bg-yellow-400 text-xs transition"
        >
          {i18n.language === "en" ? "हिंदी" : "EN"}
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
