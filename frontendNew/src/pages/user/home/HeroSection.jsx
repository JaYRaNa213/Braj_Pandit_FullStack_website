// 🔐 Redesigned by ChatGPT © 2025 - Jay Rana's Devotional Platform

import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ onAllEPujasClick, onSeeServicesClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  


  const backgroundImage =
    "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917524/IMG20250619193232_zilsdz.jpg";

  const handleAllEPujasClick = () => {
    navigate("/all-e-pujas"); // 🔁 Your route for AllEPujas.jsx
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">
      {/* Background Image with Strong Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/70 z-20" />

      {/* Foreground Content */}
      <div className="relative z-30 flex items-center justify-center h-full px-6 sm:px-10">
        <div className="max-w-2xl text-center text-white space-y-6">
          <p className="text-sm sm:text-base tracking-wider uppercase text-yellow-400 font-semibold">
            {t("hero.welcome")}
          </p>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight sm:leading-snug text-white">
            {t("hero.headline_line1")}{" "}
            <span className="text-orange-400">
              {t("hero.headline_trusted")}
            </span>{" "}
            {t("hero.headline_line2")}{" "}
            <span className="text-yellow-400">
              {t("hero.headline_ceremonies")}
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button
              onClick={onSeeServicesClick}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium text-base transition duration-300"
            >
              {t("hero.puja_booking")}
            </button>

            <button
              onClick={handleAllEPujasClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-medium text-base transition duration-300"
            >
              {t("hero.all_E_pujas")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
