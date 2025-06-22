import React, { useEffect, useState } from "react";

const heroImages = [
  "/images/shiv2.jpg",
  "/images/Premanand-Ji-Maharaj.jpg",
  "/images/premMandir.jpg",
  "/images/bihariG.jpg",
  "/images/yamuna.jpg",
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
    <section className="relative h-[90vh] overflow-hidden bg-black">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-[center_top_15%] transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      ))}

      <div className="relative z-30 text-center text-white flex items-center justify-center h-full px-4">
        <div className="max-w-3xl">
          <h5 className="text-lg font-medium mb-2">Welcome to BrajPandit</h5>
          <h1 className="text-5xl font-bold mb-4">
            Your <span className="text-red-600">Trusted</span> Platform for Sacred{" "}
            <span className="text-yellow-400">Hindu Ceremonies</span>
          </h1>
          <p className="mb-6 text-lg">
            We provide highly qualified and experienced Panditjee for all communities like Gujarati, Rajasthani, Marathi, Sindhi, Bihari, Bengali, and Panjabi.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookPanditClick}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded-full text-lg transition duration-300"
            >
              BOOK PANDIT
            </button>
            <button
              onClick={onSeeServicesClick}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-8 rounded-full text-lg transition duration-300"
            >
              See All Pooja Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
