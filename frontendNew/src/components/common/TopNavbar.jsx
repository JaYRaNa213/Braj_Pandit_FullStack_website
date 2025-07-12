import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const TopNavbar = () => {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(true);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  if (!visible) return null;

  return (
    <div className="bg-[#7b1414] text-white text-sm w-full px-4 py-3 relative flex flex-wrap items-center justify-between gap-y-3 z-50">
      
      {/* ❌ Dismiss Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-white hover:text-yellow-300 text-xl"
      >
        <MdClose />
      </button>

      {/* 🌐 Left: Social + Contact */}
      <div className="hidden sm:flex items-center gap-4 text-lg">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
          <FaInstagram />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
          <FaYoutube />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
          <FaFacebookF />
        </a>
        <Link to="/contact" className="text-xs hover:underline ml-2">
          {t("topbar.contact") || "Contact"}
        </Link>
      </div>

      {/* 🎯 Center: Offer + Book Now */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-center">
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm">
          <span className="px-3 py-1  font-medium whitespace-nowrap">
            {t("topbar.authentic_pandit") || "Authentic Braj Pandit"}
          </span>
          <span className="px-4 py-1 rounded-full border border-white font-semibold whitespace-nowrap bg-white text-[#7b1414]">
            {t("topbar.rudrabhishek_offer") || "🛕 Rudrabhishek Group Puja (E-puja - 201/-)"}
          </span>
        </div>
        <Link
          to="/booking"
          className="bg-white text-[#7b1414] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full hover:bg-yellow-300 transition-all"
          style={{
            boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.6)",
          }}
        >
          {t("topbar.book_now") || "Book Now"}
        </Link>
      </div>

      {/* 📌 Right: Be a Pandit + About + Lang Toggle */}
      <div className="hidden sm:flex items-center gap-3 text-xs">
        <Link
          to="/be-a-pandit"
          className="bg-white text-[#7b1414] font-semibold border border-[#7b1414] px-4 py-2 rounded-full hover:bg-yellow-300 transition"
        >
          {t("topbar.be_a_pandit") || "Be a Pandit"}
        </Link>
        <Link to="/about" className="hover:underline">
          {t("topbar.about") || "About Us"}
        </Link>
        
      </div>
    </div>
  );
};

export default TopNavbar;
