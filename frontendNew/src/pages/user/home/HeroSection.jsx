// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";

const heroImages = [
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917524/IMG20250619193232_zilsdz.jpg",
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917524/IMG20250619193232_zilsdz.jpg",
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852044/Premanand-Ji-Maharaj_yb93dt.jpg",
];

const HeroSection = ({ onBookPanditClick, onSeeServicesClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden bg-black dark:bg-gray-950">
      {/* Background Image Carousel */}
      {heroImages.map((src, index) => {
        const isVideo = src.endsWith(".mp4");
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            {isVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-[center_top_15%]"
                style={{ backgroundImage: `url(${src})` }}
              ></div>
            )}
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        );
      })}

      {/* Foreground Content */}
      <div className="relative z-30 text-center text-white flex items-center justify-center h-full px-4">
        <div className="max-w-3xl animate-fade-in-up">
          <h5 className="text-lg font-medium mb-2 tracking-wider uppercase text-yellow-300 dark:text-yellow-200">
            Welcome to BrajPandit
          </h5>
          <h1 className="text-5xl font-bold mb-4 leading-snug">
            Your{" "}
            <span className="text-red-500 dark:text-orange-400">Trusted</span>{" "}
            Platform for Sacred{" "}
            <span className="text-yellow-400 dark:text-yellow-300">
              Hindu Ceremonies
            </span>
          </h1>
          <p className="mb-8 text-lg text-gray-200 dark:text-gray-300">
            We provide highly qualified and experienced Panditjis for all communities —
            Gujarati, Rajasthani, Marathi, Sindhi, Bihari, Bengali, and Punjabi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={onSeeServicesClick}
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Puja Booking
            </button>
            <button
              onClick={onBookPanditClick}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Travel, Food & Stay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
