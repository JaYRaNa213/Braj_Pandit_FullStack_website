import React, { useEffect, useState } from "react";
import famousPlacesData from "../../data/famousPlaces.json";
import FamousCard from "./FamousCard";

const AllFamousPlaces = () => {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allPlaces.length]);

  return (
    <section className="py-16 px-4 bg-[#FFF8E1] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-12">
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
            <p className="text-center text-gray-500 mt-4 animate-pulse">
              Scroll to load more...
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllFamousPlaces;
