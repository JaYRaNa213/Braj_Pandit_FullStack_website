// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React from "react";
import { useTranslation } from "react-i18next";

const FamousCard = ({ place }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[220px] border border-orange-100 dark:border-gray-700 transition-all duration-300">
      <img
        src={place.url}
        alt={place.Name}
        className="h-48 md:h-auto md:w-64 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
        }}
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-2xl font-bold text-orange-700 dark:text-yellow-400 mb-1">
            {place.Name}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 line-clamp-4">
            {place.description || t("noDescription")}
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p><strong>{t("summer")}:</strong> {place.summer || "N/A"}</p>
            <p><strong>{t("winter")}:</strong> {place.winter || "N/A"}</p>
          </div>
        </div>
        <div className="mt-3">
          <a
            href={place.location || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded transition"
          >
            📍 {t("viewOnMap")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FamousCard;
