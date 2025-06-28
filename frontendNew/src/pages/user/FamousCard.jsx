// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React from "react";

const FamousCard = ({ place }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden min-h-[200px]">
      <img
        src={place.url}
        alt={place.Name}
        className="h-48 md:h-auto md:w-64 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-2xl font-bold text-orange-700 mb-2">
            {place.Name}
          </h3>
          <p className="text-gray-700 text-sm mb-2 line-clamp-3">
            {place.description}
          </p>
        </div>
        <div className="mt-2">
          <a
            href={place.location}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
          >
            📍 View on Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default FamousCard;
