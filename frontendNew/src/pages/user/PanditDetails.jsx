// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPanditById } from "../../services/user/panditService";
import { FaMapMarkerAlt, FaStar, FaPhoneAlt } from "react-icons/fa";

const PanditDetails = () => {
  const { id } = useParams();
  const [pandit, setPandit] = useState(null);

  useEffect(() => {
    const fetchPandit = async () => {
      try {
        const res = await getPanditById(id);
        setPandit(res.data?.data);
      } catch (error) {
        console.error("Error fetching pandit details");
      }
    };

    fetchPandit();
  }, [id]);

  if (!pandit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400 text-lg">Loading Pandit Details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden border dark:border-gray-700">
        {/* Image */}
        <img
          src={pandit.imageUrl || "/default-pandit.jpg"}
          alt={pandit.name}
          className="w-full h-64 object-cover md:h-80"
        />

        {/* Info Section */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-red-700 dark:text-yellow-400">{pandit.name}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <FaMapMarkerAlt className="text-red-500" /> {pandit.location}
          </p>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="text-gray-800 dark:text-gray-200">
              🧘 Expertise: <strong>{pandit.expertise}</strong>
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              ⏳ Experience: <strong>{pandit.experience}</strong>
            </span>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{pandit.bio}</p>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={`tel:${pandit.phone || "6395857663"}`}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
            >
              <FaPhoneAlt /> Call Now
            </a>
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition">
              📿 Book This Pandit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditDetails;
