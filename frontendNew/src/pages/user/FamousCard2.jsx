// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React from "react";
import { useTranslation } from "react-i18next";

const FamousCard2 = ({ place, isBack = false }) => {
  const { t } = useTranslation();
  const key = place.key; // Unique key like "place1", "place2", etc.

  if (!key) {
    return null; // Avoid rendering if key is missing
  }

  return (
    <div className="w-full h-full">
      {isBack ? (
        <div className="bg-orange-100 dark:bg-gray-700 rounded-xl shadow-inner flex items-center justify-center h-full text-orange-700 dark:text-yellow-400 font-semibold text-lg backface-hidden">
          🔄 {t("famousCard.rotate")}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-orange-200 dark:border-gray-700 hover:shadow-2xl transition duration-300 h-full backface-hidden">
          <img
            src={t(`HomePlace.url.${key}`)}
            alt={t(`HomePlace.Name.${key}`)}
            className="w-full h-40 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x160?text=No+Image";
            }}
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-bold text-orange-700 dark:text-yellow-400 mb-1">
              {t(`HomePlace.Name.${key}`)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-2">
              {t(`HomePlace.description.${key}`) || t("famousCard.noDescription")}
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>
                <strong>{t("famousCard.summer")}:</strong>{" "}
                {t(`HomePlace.summer.${key}`) || t("famousCard.na")}
              </p>
              <p>
                <strong>{t("famousCard.winter")}:</strong>{" "}
                {t(`HomePlace.winter.${key}`) || t("famousCard.na")}
              </p>
            </div>
            <a
              href={t(`HomePlace.location.${key}`) || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-orange-600 dark:text-yellow-400 font-semibold hover:underline text-sm"
            >
              📍 {t("famousCard.viewMap")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamousCard2;
