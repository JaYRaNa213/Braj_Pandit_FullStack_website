// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import pujaServicesData from "../../data/pujaServices.json";

export default function PujaDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const service = query.get("service");
  const { t } = useTranslation();

  const [pujaData, setPujaData] = useState(null);

  useEffect(() => {
    const cleanService = decodeURIComponent(service || "").trim().toLowerCase();
    const match = pujaServicesData.find(
      (item) => item.title.toLowerCase() === cleanService
    );
    setPujaData(match || null);
  }, [service]);

  if (!pujaData) {
    return (
      <div className="p-6 text-center text-red-600 min-h-screen flex flex-col justify-center items-center dark:bg-gray-900 dark:text-red-400">
        <h2 className="text-xl font-semibold">🚫 {t("puja.invalid")}</h2>
        <button
          onClick={() => navigate("/all-puja-services")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
        >
          {t("puja.back")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Left Image Section */}
        <div className="md:w-1/2 relative">
          <img
            src={pujaData.img}
            alt={pujaData.title}
            className="w-full h-64 md:h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => (e.target.src = "/fallback.jpg")}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-red-800 via-red-600 to-transparent text-white text-center py-4 px-2 flex flex-col gap-2 items-center">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <FaWhatsapp className="text-green-300" /> {t("puja.whatsapp")}
            </a>
            <a
              href="tel:+916395857663"
              className="flex items-center gap-2 hover:underline"
            >
              <FaPhoneAlt className="text-yellow-300" /> {t("puja.call")}
            </a>
          </div>
        </div>

        {/* Right Details Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-4">
              {pujaData.title}
            </h2>
            <p className="text-gray-800 dark:text-gray-300 text-justify leading-relaxed">
              {pujaData.description}
            </p>
            <p className="text-sm mt-4 text-gray-500 dark:text-gray-400 italic">
              📂 {t("puja.category")}: {pujaData.category} | ⭐ {t("puja.rating")}: {pujaData.rating}/5
            </p>
          </div>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition"
              onClick={() =>
                navigate(
                  `/booking?service=${encodeURIComponent(pujaData.title)}&pandit=Vrinda%20Pandit`
                )
              }
            >
              📿 {t("puja.book")}
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
              onClick={() => navigate("/all-puja-services")}
            >
              ← {t("puja.back")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
