// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/user/FamousCard2.jsx

import React from "react";

const FamousCard2 = ({ place }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 duration-300">
      <img
        src={place.url}
        alt={place.Name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-orange-700 mb-2">{place.Name}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{place.description}</p>
        <div className="mt-3 text-sm text-gray-500">
          <p><strong>Summer:</strong> {place.summer}</p>
          <p><strong>Winter:</strong> {place.winter}</p>
        </div>
        <a
          href={place.location}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-orange-600 font-semibold hover:underline text-sm"
        >
          📍 View on Map
        </a>
      </div>
    </div>
  );
};

export default FamousCard2;
