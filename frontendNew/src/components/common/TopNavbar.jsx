// src/components/common/TopNavbar.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-red-700 dark:bg-yellow-500 text-white dark:text-black text-sm h-[40px] overflow-hidden">
      {/* 🔁 Scrolling Marquee with Fading Masks */}
      <div className="absolute inset-y-0 left-0 right-[180px] overflow-hidden">
        <div className="relative h-full w-full">
          {/* Fading Masks */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-red-700 dark:from-yellow-500 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-red-700 dark:from-yellow-500 to-transparent z-20 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex w-max animate-marquee gap-16 px-4">
            {[...Array(1)].map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-3 font-medium whitespace-nowrap"
              >
                {t("topbar.special_offer") || " Book Grah Shanti Puja at only ₹201!"}
                <Link
                  to="/booking"
                  className="bg-white text-red-700 dark:text-black font-semibold text-xs px-3 py-1 rounded-full hover:bg-yellow-300 transition"
                >
                  {t("topbar.book_now") || "Book Now"}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 📌 Static Right Links */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden sm:flex gap-4 text-xs z-30">
        <a href="/about" className="hover:underline">
          {t("topbar.about") || "About Us"}
        </a>
        <a href="/contact" className="hover:underline">
          {t("topbar.contact") || "Contact"}
        </a>
      </div>
    </div>
  );
};

export default TopNavbar;
