// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import famousPlacesData from "../../../data/famousPlaces.json";

const FamousPlacesSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

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

  return (
    <section className="py-16 px-4 bg-orange-50 dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-700 dark:text-orange-300">
          {t("famous_places_title")}
        </h2>
        <button
          onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
          className="text-sm border px-3 py-1 rounded-full bg-white dark:bg-gray-800 dark:text-orange-300 text-orange-700 hover:bg-orange-100 dark:hover:bg-gray-700 transition"
        >
          {i18n.language === "en" ? "🌐 हिंदी" : "🌐 English"}
        </button>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        <div className="flex gap-4 w-fit">
          {famousPlacesData.mandirs.map((place) => (
            <div
              key={place.key}
              className="min-w-[160px] max-w-[160px] bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-500 rounded-xl shadow-md p-3 flex-shrink-0 hover:shadow-xl transition-transform hover:scale-[1.03]"
            >
              <img
                src={t(`HomePlace.url.${place.key}`)}
                alt={t(`HomePlace.Name.${place.key}`)}
                className="w-full h-28 object-cover rounded-md mb-2"
              />
              <h3 className="text-sm font-bold text-orange-800 dark:text-orange-300 line-clamp-1">
                {t(`HomePlace.Name.${place.key}`)}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {t(`HomePlace.description.${place.key}`)}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openMap(t(`HomePlace.location.${place.key}`));
                }}
                className="mt-2 text-[10px] bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-white font-semibold py-1 px-2 rounded hover:bg-orange-200 dark:hover:bg-orange-700 transition"
              >
                {t("view_on_map")}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate("/famous-places")}
          className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          {t("view_more")}
        </button>
      </div>
    </section>
  );
};

export default FamousPlacesSection;
