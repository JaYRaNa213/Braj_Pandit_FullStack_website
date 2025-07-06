// FamousPlacesSection.jsx

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import famousPlacesData from "../../../data/famousPlaces.json";

const FamousPlacesSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const openMap = (url) => window.open(url, "_blank");

  useEffect(() => {
    const container = scrollRef.current;
    let scrollSpeed = 1;
    const scrollInterval = 20;

    const autoScroll = setInterval(() => {
      if (container) {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
    }, scrollInterval);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <section className="py-16 px-4 text-center bg-[#fef8f4] dark:bg-[#1c1c1c]">
      <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center px-2">
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

      <div ref={scrollRef} className="max-w-7xl mx-auto overflow-hidden" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-4 w-fit">
          {famousPlacesData.mandirs.map((place) => (
            <div
              key={place.key}
              className="min-w-[140px] max-w-[140px] bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-500 rounded-lg shadow p-2 flex-shrink-0"
            >
              <img
                src={t(`HomePlace.url.${place.key}`)}
                alt={t(`HomePlace.Name.${place.key}`)}
                className="w-full h-24 object-cover rounded-md mb-1"
              />
              <h3 className="text-[13px] font-semibold text-orange-700 dark:text-orange-300">
                {t(`HomePlace.Name.${place.key}`)}
              </h3>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2">
                {t(`HomePlace.description.${place.key}`)}
              </p>
              <button
                onClick={() => openMap(t(`HomePlace.location.${place.key}`))}
                className="mt-2 text-[10px] bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-white font-semibold py-1 px-2 rounded hover:bg-orange-200 dark:hover:bg-orange-700 transition"
              >
                {t("view_on_map")}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
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
