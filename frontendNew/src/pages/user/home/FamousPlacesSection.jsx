// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import famousPlacesData from "../../../data/famousPlaces.json";
import "./carousel.css";

const FamousPlacesSection = () => {
  const [language, setLanguage] = useState("en");
  const [angle, setAngle] = useState(0);
  const containerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0 });
  const pauseRef = useRef(false);
  const navigate = useNavigate();
  const radius = 550;
  const total = famousPlacesData.mandirs.length;

  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      if (!pauseRef.current) setAngle((prev) => prev + 0.1);
    }, 50);
    return () => clearInterval(autoScrollRef.current);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setAngle((prev) => prev - 10);
      if (e.key === "ArrowRight") setAngle((prev) => prev + 10);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handlePause = () => (pauseRef.current = true);
  const handleResume = () => (pauseRef.current = false);

  const handleMouseDown = (e) => {
    dragRef.current = { isDragging: true, startX: e.clientX };
    containerRef.current.classList.add("cursor-grabbing");
    handlePause();
  };

  const handleMouseMove = (e) => {
    if (dragRef.current.isDragging) {
      const dx = e.clientX - dragRef.current.startX;
      setAngle((prev) => prev + dx * 0.5);
      dragRef.current.startX = e.clientX;
    }
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
    containerRef.current.classList.remove("cursor-grabbing");
    handleResume();
  };

  const handleWheel = (e) => {
    handlePause();
    setAngle((prev) => prev + e.deltaY * 0.6);
    setTimeout(() => handleResume(), 300);
  };

  const handleTouchStart = (e) => {
    dragRef.current = { isDragging: true, startX: e.touches[0].clientX };
    handlePause();
  };

  const handleTouchMove = (e) => {
    if (dragRef.current.isDragging) {
      const dx = e.touches[0].clientX - dragRef.current.startX;
      setAngle((prev) => prev + dx * 0.5);
      dragRef.current.startX = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    dragRef.current.isDragging = false;
    handleResume();
  };

  const openMap = (url) => window.open(url, "_blank");

  return (
    <section
      className="py-16 px-4 text-center overflow-hidden min-h-[700px] relative"
      aria-label="3D rotating carousel of famous places"
      role="region"
    >
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-photo/white-water-rafting-on-gangas-600nw-2363059301.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full bg-white dark:bg-black opacity-50 dark:opacity-70"></div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center max-w-5xl mx-auto mb-6 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 drop-shadow-lg transition-all duration-500">
            {language === "en"
              ? "Famous Places of Mathura"
              : "मथुरा के प्रसिद्ध स्थल"}
          </h2>
          <button
            onClick={() => setLanguage((prev) => (prev === "en" ? "hi" : "en"))}
            aria-label="Toggle language"
            className="text-sm border px-3 py-1 rounded-full bg-white dark:bg-gray-800 dark:text-orange-300 text-orange-700 hover:bg-orange-100 dark:hover:bg-gray-700 transition"
          >
            {language === "en" ? "🌐 हिंदी" : "🌐 English"}
          </button>
        </div>

        <div className="w-full flex justify-center items-center">
          <div
            ref={containerRef}
            className="relative w-full max-w-[90vw] h-[320px] md:h-[300px] [transform-style:preserve-3d]"
            style={{ transform: `rotateY(${angle}deg)` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
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
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[200px] sm:w-[220px] h-[280px] sm:h-[300px] transition-transform duration-500"
                  style={{ transform: rotation }}
                >
                  <div
                    className="w-full h-full card-flip"
                    style={{ transform: `rotateY(${showBack ? 180 : 0}deg)` }}
                  >
                    <div className="card-face card-front p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                      <div>
                        <img
                          src={place.url}
                          alt={place.Name}
                          className="w-full h-36 object-cover rounded-md mb-2"
                        />
                        <h3 className="text-base font-bold text-orange-700 dark:text-orange-400">
                          {language === "en" ? place.Name : place.hindi}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                          {place.description}
                        </p>
                      </div>
                      <button
                        onClick={() => openMap(place.location)}
                        className="mt-2 text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 font-semibold py-1 px-2 rounded hover:bg-orange-200 dark:hover:bg-orange-800 transition"
                      >
                        🔗 {language === "en" ? "View on Map" : "नक्शे पर देखें"}
                      </button>
                    </div>

                    <div className="card-face card-back p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                          {language === "en"
                            ? "📍 Best Time to Visit:"
                            : "📍 यात्रा का समय:"}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                          ☀ {language === "en" ? "Summer" : "गर्मी"}: {place.summer || "N/A"}
                          <br />
                          ❄ {language === "en" ? "Winter" : "सर्दी"}: {place.winter || "N/A"}
                        </p>
                        {place.tips && (
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 italic">
                            💡 {language === "en" ? "Tip: " : "सलाह: "}
                            {place.tips}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => openMap(place.location)}
                        className="mt-3 text-xs bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-white font-bold py-1 px-2 rounded hover:bg-orange-300 dark:hover:bg-orange-600 transition"
                      >
                        📌 {language === "en" ? "Open Map" : "नक्शा खोलें"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <button
            onClick={() => navigate("/famous-places")}
            className="bg-orange-600 dark:bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-700 dark:hover:bg-orange-400 transition"
          >
            {language === "en" ? "🔍 View More" : "🔍 और देखें"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FamousPlacesSection;
