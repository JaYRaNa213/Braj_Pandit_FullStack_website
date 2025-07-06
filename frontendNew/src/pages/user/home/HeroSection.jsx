// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const heroImages = [
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917524/IMG20250619193232_zilsdz.jpg",
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917524/IMG20250619193232_zilsdz.jpg",
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
  
  
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
];

const HeroSection = ({ onBookPanditClick, onSeeServicesClick }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Preload images
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">
      {/* Carousel Container */}
      <div className="absolute inset-0">
        {heroImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out will-change-transform pointer-events-none ${
              index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        {/* Optional: dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-30 flex items-center justify-center h-full px-4">
        <div className="max-w-3xl text-center text-white animate-fade-in-up">
          <h5 className="text-lg font-medium mb-2 tracking-wider uppercase text-yellow-300">
            {t("hero.welcome")}
          </h5>
          <h1 className="text-5xl font-bold mb-4 leading-snug">
            {t("hero.headline_line1")}{" "}
            <span className="text-red-500">{t("hero.headline_trusted")}</span>{" "}
            {t("hero.headline_line2")}{" "}
            <span className="text-yellow-400">{t("hero.headline_ceremonies")}</span>
          </h1>
          <p className="mb-8 text-lg text-gray-200">{t("hero.description")}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={onSeeServicesClick}
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t("hero.puja_booking")}
            </button>
            <button
              onClick={onBookPanditClick}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t("hero.travel_food_stay")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
