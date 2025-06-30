// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pujaServicesData from "../../data/pujaServices.json";

const AllPujaServices = () => {
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
      <h1 className="text-4xl font-bold text-center text-[#4A1C1C] mb-10">
        🕊️ All Puja Services
      </h1>

      {Object.entries(groupedServices).map(([category, services]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition duration-300"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-36 object-cover rounded"
                />
                <h3 className="mt-3 font-bold text-lg text-[#4A1C1C]">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {service.description}
                </p>
                <div className="mt-2 text-yellow-500 text-sm">
                  {"⭐️".repeat(service.rating)}
                </div>
                <button
                  onClick={() => handleBooking(service.title)}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Book Puja
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPujaServices;
