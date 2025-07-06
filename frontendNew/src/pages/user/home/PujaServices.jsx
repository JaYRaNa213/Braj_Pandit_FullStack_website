// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

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
    setServices(pujaData.slice(0, 4));
  }, []);

  const handleBooking = (serviceTitle) => {
    const encodedService = encodeURIComponent(serviceTitle);
    navigate(`/puja-details?service=${encodedService}`);
  };

  const handleViewMore = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate("/all-puja-services");
  };

  return (
    <Element name="pujaServicesSection">
      <section
        className="light-bg bg-gray-100 dark:bg-gray-900"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/djtq2eywl/image/upload/v1751620759/h-about-us.png_kzrnid.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/80 dark:bg-black/60 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-red-700 dark:text-yellow-300 mb-10">
            {t("pujas.heading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-yellow-400 dark:border-orange-400 hover:shadow-xl transition"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full md:w-1/2 h-64 object-cover"
                />
                <div className="p-6 flex flex-col justify-between md:w-1/2">
                  <div>
                    <h3 className="text-xl font-bold text-red-700 dark:text-yellow-200 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {service.desc}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
                      {t("pujas.price")}{" "}
                      <span className="text-red-600 dark:text-orange-400">
                        {t("pujas.price_on_request")}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleBooking(service.title)}
                    className="mt-4 w-max bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 dark:hover:bg-orange-600 transition"
                  >
                    {t("pujas.book_now")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={handleViewMore}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
            >
              {t("pujas.view_more")}
            </button>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default PujaServices;
