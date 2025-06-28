// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/user/home/FamousPlacesSection.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import famousPlacesData from "../../../data/famousPlaces.json";
import FamousCard2 from "../FamousCard2"; // new optimized card

const FamousPlacesSection = () => {
  const navigate = useNavigate();
  const placesToShow = famousPlacesData.mandirs.slice(0, 4);

  return (
    <section className="py-16 px-4 bg-[#FFF8E1]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-orange-600">
          Famous Places of Mathura
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placesToShow.map((place, index) => (
            <FamousCard2 key={index} place={place} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/famous-places")}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition text-lg font-semibold"
          >
            View More Places →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FamousPlacesSection;
