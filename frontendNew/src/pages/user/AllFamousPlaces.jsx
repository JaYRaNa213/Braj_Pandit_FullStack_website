// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import famousPlacesData from "../../data/famousPlaces.json";
import FamousCard from "./FamousCard";

const AllFamousPlaces = () => {
  const navigate = useNavigate();
  const allPlaces = famousPlacesData.mandirs;
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        setVisibleCount((prev) => Math.min(prev + 3, allPlaces.length));
      }
    };

    const checkInitialScroll = () => {
      if (document.body.scrollHeight <= window.innerHeight) {
        setVisibleCount((prev) => Math.min(prev + 3, allPlaces.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkInitialScroll();

    const resizeObserver = new ResizeObserver(checkInitialScroll);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [allPlaces.length]);

  return (
    <section className="py-16 px-4 bg-[#FFF8E1] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* ⬅️ Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-full font-medium shadow transition"
          >
            ← Back to Home
          </button>
        </div>

        <h1 className="text-4xl font-bold text-center text-orange-600 dark:text-yellow-400 mb-12">
          All Famous Places in Mathura
        </h1>

        <div className="space-y-10">
          {allPlaces.slice(0, visibleCount).map((place, index) => (
            <div
              key={index}
              className="transition-transform duration-300 hover:scale-[1.01]"
            >
              <FamousCard place={place} />
            </div>
          ))}

          {visibleCount < allPlaces.length && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4 animate-pulse">
              Scroll to load more...
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllFamousPlaces;
