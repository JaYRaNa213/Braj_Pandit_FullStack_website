// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import pujaData from "../../../data/pujaServices.json"; // ✅ import JSON data

const PujaServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Load only the first 4 services
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
            "url('https://res.cloudinary.com/djtq2eywl/image/upload/v1750869706/bgImage_v2ebyx.jpg')",
        }}
      >
        <div
          className="absolute inset-0 z-10 backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
          }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-red-700 mb-10">
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
                className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full md:w-1/2 h-64 object-cover"
                />
                <div className="p-6 flex flex-col justify-between md:w-1/2">
                  <div>
                    <h3 className="text-xl font-bold text-red-700 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-3">{service.desc}</p>
                    <p className="text-gray-800 font-semibold mb-2">
                      Price:{" "}
                      <span className="text-red-600">₹ Price on Request</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleBooking(service.title)}
                    className="mt-4 w-max bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
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
              className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
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
