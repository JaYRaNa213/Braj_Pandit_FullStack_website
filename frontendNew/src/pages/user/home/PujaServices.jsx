// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import pujaData from "../../../data/pujaServices.json";

const PujaServices = () => {
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
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/516416070/photo/the-earth-hour-in-lviv-ukraine.jpg?s=612x612&w=0&k=20&c=nGl1KooAwZIzV6V8ogcpC7AIDKX6wli6FtCgO0AT_4w=')",
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white/80 dark:bg-black/60 z-10" />

        {/* Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-red-700 dark:text-yellow-300 mb-10">
            Pooja Services
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
                      Price:{" "}
                      <span className="text-red-600 dark:text-orange-400">
                        ₹ Price on Request
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleBooking(service.title)}
                    className="mt-4 w-max bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 dark:hover:bg-orange-600 transition"
                  >
                    BOOK NOW
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={handleViewMore}
              className="px-6 py-2 border-2 border-red-600 text-red-600 dark:border-orange-400 dark:text-orange-400 rounded-full hover:bg-red-600 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition"
            >
              View More Puja Services
            </button>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default PujaServices;
