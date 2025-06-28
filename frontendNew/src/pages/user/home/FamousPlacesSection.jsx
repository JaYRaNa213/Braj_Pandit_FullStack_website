import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import famousPlacesData from "../../../data/famousPlaces.json";
import "./carousel.css";

const FamousPlacesSection = () => {
  const [language, setLanguage] = useState("en");
  const containerRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const radius = 550;
  const total = famousPlacesData.mandirs.length;
  const autoScrollRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setAngle((prev) => prev + 0.3);
    }, 40);
    return () => clearInterval(autoScrollRef.current);
  }, []);

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

  const openMap = (url) => {
    window.open(url, "_blank");
  };

  return (
    <section
      className="py-16 px-4 text-center overflow-hidden bg-cover bg-center bg-no-repeat min-h-[700px]"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/05/40/57/59/360_F_540575959_iztEiVVyVRDIgVs3O96R61lvbe8AvYv5.jpg')",
      }}
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center max-w-5xl mx-auto mb-6 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 drop-shadow-lg">
            {language === "en" ? "Famous Places of Mathura" : "मथुरा के प्रसिद्ध स्थल"}
          </h2>
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="text-sm border px-3 py-1 rounded-full bg-white text-orange-700 hover:bg-orange-100 transition"
          >
            {language === "en" ? "🌐 हिंदी" : "🌐 English"}
          </button>
        </div>

        {/* 3D Carousel */}
        <div className="w-full flex justify-center items-center">
          <div
            ref={containerRef}
            className="relative w-full max-w-[90vw] h-[320px] md:h-[300px] [transform-style:preserve-3d]"
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
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[200px] sm:w-[220px] h-[280px] sm:h-[300px] transition-transform duration-500"
                  style={{ transform: rotation }}
                >
                  <div
                    className="w-full h-full card-flip"
                    style={{ transform: `rotateY(${showBack ? 180 : 0}deg)` }}
                  >
                    {/* Front */}
                    <div className="card-face card-front bg-white p-2 shadow-lg rounded-lg flex flex-col justify-between">
                      <div>
                        <img
                          src={place.url}
                          alt={place.Name}
                          className="w-full h-36 object-cover rounded-md mb-2"
                        />
                        <h3 className="text-base font-bold text-orange-700">
                          {language === "en" ? place.Name : place.hindi}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {place.description}
                        </p>
                      </div>
                      <button
                        onClick={() => openMap(place.location)}
                        className="mt-2 text-xs bg-orange-100 text-orange-700 font-semibold py-1 px-2 rounded hover:bg-orange-200 transition"
                      >
                        🔗 {language === "en" ? "View on Map" : "नक्शे पर देखें"}
                      </button>
                    </div>

                    {/* Back */}
                    <div className="card-face card-back bg-orange-100 p-3 rounded-lg shadow-inner flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-gray-700 mb-2 font-semibold">
                          {language === "en" ? "📍 Best Time to Visit:" : "📍 यात्रा का समय:"}
                        </p>
                        <p className="text-xs text-gray-600 leading-tight">
                          ☀ {language === "en" ? "Summer" : "गर्मी"}: {place.summer || "N/A"}
                          <br />
                          ❄ {language === "en" ? "Winter" : "सर्दी"}: {place.winter || "N/A"}
                        </p>
                        {place.tips && (
                          <p className="text-[11px] text-gray-500 mt-2 italic">
                            💡 {language === "en" ? "Tip: " : "सलाह: "}
                            {place.tips}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => openMap(place.location)}
                        className="mt-3 text-xs bg-orange-200 text-orange-800 font-bold py-1 px-2 rounded hover:bg-orange-300 transition"
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

        {/* View More Button */}
        <div className="mt-12">
          <button
            onClick={() => navigate("/famous-places")}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-700 transition"
          >
            {language === "en" ? "🔍 View More" : "🔍 और देखें"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FamousPlacesSection;
