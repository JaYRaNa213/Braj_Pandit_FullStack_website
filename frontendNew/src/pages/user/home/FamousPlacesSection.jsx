// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import famousPlacesData from "../../../data/famousPlaces.json";
import "./carousel.css";

const FamousPlacesSection = () => {
  const containerRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const radius = 550;
  const total = famousPlacesData.mandirs.length;
  const autoScrollRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0 });
  const navigate = useNavigate();

  // 🎡 Auto rotate
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setAngle((prev) => prev + 0.3);
    }, 40);
    return () => clearInterval(autoScrollRef.current);
  }, []);

  // 🎯 Drag handlers
  const handleMouseDown = (e) => {
    dragRef.current = { isDragging: true, startX: e.clientX };
    containerRef.current.classList.add("cursor-grabbing");
  };
  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
    containerRef.current.classList.remove("cursor-grabbing");
  };
  const handleMouseMove = (e) => {
    if (dragRef.current.isDragging) {
      const dx = e.clientX - dragRef.current.startX;
      setAngle((prev) => prev + dx * 0.1);
      dragRef.current.startX = e.clientX;
    }
  };
  const handleTouchStart = (e) => {
    dragRef.current = { isDragging: true, startX: e.touches[0].clientX };
  };
  const handleTouchMove = (e) => {
    if (dragRef.current.isDragging) {
      const dx = e.touches[0].clientX - dragRef.current.startX;
      setAngle((prev) => prev + dx * 0.1);
      dragRef.current.startX = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => {
    dragRef.current.isDragging = false;
  };

  return (
    <section className="py-20 px-4 bg-[#FFF8E1] text-center">
      <h2 className="text-4xl font-bold mb-16 text-orange-600">
        🌟 Famous Places of Mathura
      </h2>

      <div className="w-full flex justify-center items-center">
        <div
          ref={containerRef}
          className="relative w-[550px] h-[300px] [transform-style:preserve-3d]"
          style={{ transform: `rotateY(${angle}deg)` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {famousPlacesData.mandirs.map((place, i) => {
            const theta = (360 / total) * i;
            const rotation = `rotateY(${theta}deg) translateZ(${radius}px)`;
            const placeAngle = ((theta + angle) % 360 + 360) % 360;
            const showBack = placeAngle > 90 && placeAngle < 270;

            return (
              <div
                key={i}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[200px] h-[280px] transition-transform duration-500"
                style={{ transform: rotation }}
              >
                <div
                  className="w-full h-full card-flip"
                  style={{
                    transform: `rotateY(${showBack ? 180 : 0}deg)`,
                  }}
                >
                  {/* Front Face */}
                  <div className="card-face card-front bg-white p-2">
                    <img
                      src={place.url}
                      alt={place.Name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h3 className="text-lg font-bold text-orange-700">{place.Name}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {place.description}
                    </p>
                  </div>

                  {/* Back Face */}
                  <div className="card-face card-back bg-orange-100 p-4">
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      📍 Best Time to Visit:
                    </p>
                    <p className="text-xs text-gray-600">
                      ☀ Summer: {place.summer}
                      <br />
                      ❄ Winter: {place.winter}
                    </p>
                    <a
                      href={place.location}
                      target="_blank"
                      className="block mt-4 text-orange-600 font-bold underline text-sm"
                    >
                      🔗 View on Map
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔗 View More Button */}
      <div className="mt-12">
        <button
          onClick={() => navigate("/famous-places")}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-700 transition"
        >
          🔍 View More
        </button>
      </div>
    </section>
  );
};

export default FamousPlacesSection;
