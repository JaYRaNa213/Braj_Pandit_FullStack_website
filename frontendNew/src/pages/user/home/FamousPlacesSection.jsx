// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import famousPlacesData from "../../../data/famousPlaces.json";

const FamousPlacesSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const openMap = (url) => window.open(url, "_blank");

  return (
    <section className="py-16 px-4 text-center bg-[#fef8f4] dark:bg-[#1c1c1c]">
      {/* Header */}
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

      {/* Horizontal Scrollable Cards */}
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <div className="flex gap-4 min-w-[1200px]">
          {famousPlacesData.mandirs.slice(0, 8).map((place, index) => (
            <div
              key={index}
              className="min-w-[140px] max-w-[140px] bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-500 rounded-lg shadow p-2 flex-shrink-0"
            >
              <img
                src={place.url}
                alt={place.Name}
                className="w-full h-24 object-cover rounded-md mb-1"
              />
              <h3 className="text-[13px] font-semibold text-orange-700 dark:text-orange-300">
                {i18n.language === "en" ? place.Name : place.hindi}
              </h3>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2">
                {place.description}
              </p>
              <button
                onClick={() => openMap(place.location)}
                className="mt-2 text-[10px] bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-white font-semibold py-1 px-2 rounded hover:bg-orange-200 dark:hover:bg-orange-700 transition"
              >
                {t("view_on_map")}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12">
        <button
          onClick={() => navigate("/famous-places")}
          className="bg-orange-600 dark:bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-700 dark:hover:bg-orange-400 transition"
        >
          {t("view_more")}
        </button>
      </div>
    </section>
  );
};

export default FamousPlacesSection;
