// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pujaServicesData from "../../data/pujaServices.json";
import { useTranslation } from "react-i18next";

// ⭐ Star Ratings Renderer
const renderStars = (rating = 4) => {
  return [...Array(5)].map((_, i) => (
    <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
      ★
    </span>
  ));
};

const AllEPujas = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [groupedServices, setGroupedServices] = useState({});

  useEffect(() => {
    const grouped = pujaServicesData.reduce((acc, service) => {
      if (!acc[service.category]) acc[service.category] = [];
      acc[service.category].push(service);
      return acc;
    }, {});
    setGroupedServices(grouped);
  }, []);

  const handleBooking = (serviceTitle) => {
    navigate(`/puja-details?service=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#4A1C1C] dark:text-yellow-400 mb-10">
        🕊️ {t("AllEPujas.all_e_pujas")}
      </h1>

      {Object.entries(groupedServices).map(([category, services]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-yellow-300 mb-4">
            {t(`AllEPujas.categories.${category}`, category)}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col"
              >
                <div className="w-full aspect-[4/3] overflow-hidden rounded-t-xl bg-gray-100">
                  <img
                    src={service.img || "/default-puja.jpg"}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-puja.jpg";
                    }}
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-[#4A1C1C] dark:text-white">
                    {t(`AllEPujas.titles.${service.title}`, service.title)}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                    {t(`AllEPujas.descriptions.${service.title}`, service.description)}
                  </p>

                  <div className="mt-2 text-sm">{renderStars(service.rating)}</div>

                  <button
                    onClick={() => handleBooking(service.title)}
                    className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition w-full font-semibold text-sm"
                  >
                    {t("AllEPujas.book_button")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllEPujas;
