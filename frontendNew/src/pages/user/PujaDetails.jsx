// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import pujaServicesData from "../../data/pujaServices.json";

export default function PujaDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const service = query.get("service");

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
      <div className="p-6 text-center text-red-600 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold">🚫 Invalid Puja Selected</h2>
        <button
          onClick={() => navigate("/all-puja-services")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Go Back to All Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 bg-red-50 rounded-xl shadow-md overflow-hidden">
        <div className="md:w-1/2 relative">
          <img
            src={pujaData.img}
            alt={pujaData.title}
            className="w-full h-64 md:h-full object-cover"
            onError={(e) => (e.target.src = "/fallback.jpg")}
          />
          <div className="absolute bottom-0 left-0 w-full bg-red-700 text-white text-center py-3 flex flex-col gap-2 items-center">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:underline"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
            <a
              href="tel:+916395857663"
              className="flex items-center gap-2 hover:underline"
            >
              <FaPhoneAlt /> Call Now On +91 6395857663
            </a>
          </div>
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-red-700 mb-4">{pujaData.title}</h2>
            <p className="text-gray-800 text-justify">{pujaData.description}</p>
            <p className="text-sm mt-4 text-gray-500 italic">
              📂 Category: {pujaData.category} | ⭐ Rating: {pujaData.rating}/5
            </p>
          </div>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              onClick={() =>
                navigate(
                  `/booking?service=${encodeURIComponent(pujaData.title)}&pandit=Vrinda%20Pandit`
                )
              }
            >
              Book This Puja
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
              onClick={() => navigate("/all-puja-services")}
            >
              ← Back to All Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
