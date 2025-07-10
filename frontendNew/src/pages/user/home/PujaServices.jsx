// 🔐 Finalized by ChatGPT © 2025 - Jay Rana's Devotional Platform

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import pujaData from "../../../data/pujaServices.json";

const PujaServices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(pujaData.slice(0, 4)); // Show only 4 on homepage
  }, []);

  const handleBookNow = (serviceTitle) => {
    const encoded = encodeURIComponent(serviceTitle);
    navigate(`/puja-details?service=${encoded}`);

  };

  const handleViewMore = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate("/all-puja-services");
  };

  return (
    <Element name="pujaServicesSection">
      <div className="relative bg-gray-50 dark:bg-gray-900 py-10">
        {/* ✅ Background Watermark with fixed URL */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-40"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/djtq2eywl/image/upload/v1751620759/h-about-us.png')",
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-red-700 dark:text-yellow-300 mb-12"
          >
            {t("pujas.heading") || "Popular Puja Services"}
          </motion.h2>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-yellow-400 dark:border-orange-400 transition"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-2 flex flex-col justify-between min-h-[20px]">
  <div>
    <h3 className="text-lg font-bold text-red-700 dark:text-yellow-200 mb-2">
      {service.title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
  {service.desc}
</p>

    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
      {t("pujas.price")}{" "}
      <span className="text-red-600 dark:text-orange-400">
        {t("pujas.price_on_request")}
      </span>
    </p>
  </div>

  <button
    onClick={() => handleBookNow(service.title)}
    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-full transition dark:hover:bg-orange-600"
  >
    {t("pujas.book_now") || "Book Now"}
  </button>
</div>

              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <button
              onClick={handleViewMore}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
            >
              {t("pujas.view_more") || "View More Services"}
            </button>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default PujaServices;
