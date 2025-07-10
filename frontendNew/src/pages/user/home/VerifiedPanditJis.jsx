// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { getAllPandits } from "../../../services/user/panditService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Util: Generate rating based on localStorage click count
const getRating = (name) => {
  const count = parseInt(localStorage.getItem(`clicks_${name}`)) || 0;
  return Math.min((count / 10).toFixed(1), 5);
};

// Util: Increment click count for rating logic
const incrementClick = (name) => {
  const key = `clicks_${name}`;
  const prev = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, prev + 1);
};

// Render stars based on rating value
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex text-yellow-400 text-xs gap-[1px]">
      {Array(full).fill().map((_, i) => <span key={`f-${i}`}>★</span>)}
      {half && <span>☆</span>}
      {Array(empty).fill().map((_, i) => <span key={`e-${i}`}>☆</span>)}
    </div>
  );
};

// Build full image URL or fallback
const getPanditImageUrl = (url) => {
  if (!url) return "/default-pandit.png";
  return url.startsWith("http") ? url : `http://localhost:7000/${url}`;
};

const VerifiedPanditJis = () => {
  const [pandits, setPandits] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await getAllPandits();
        const verified = res?.data?.filter(p => p.status?.toLowerCase() === "approved");
        const withRatings = (verified || []).map(p => ({
          ...p,
          rating: parseFloat(getRating(p.name)),
        }));
        const sorted = withRatings.sort((a, b) => b.rating - a.rating);
        setPandits(sorted.slice(0, 8)); // 2 rows x 4 cards
      } catch (err) {
        console.error("Error fetching pandits", err);
      }
    };
    fetchPandits();
  }, []);

  const handleBookPandit = (name) => {
    incrementClick(name);
    navigate(`/puja-booking?pandit=${encodeURIComponent(name)}&service=${encodeURIComponent("Bhagwat Katha")}`);
  };

  return (
    <section className="py-16 px-4 bg-orange-50 dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-start">
        {/* LEFT TEXT SECTION */}
        <div className="md:w-1/3 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-700 dark:text-orange-300 mb-3">
  {t("verifiedPandits.title")}{" "}
  <span className="text-red-700 dark:text-red-400">
    {t("verifiedPandits.topRated")}{" "}
    {t("verifiedPandits.panditji")}
  </span>
</h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {t("verifiedPandits.description", "Connect with our most trusted and experienced panditjis for your sacred rituals.")}
          </p>
          <button
            onClick={() => navigate("/pandits")}
            className="text-sm border px-4 py-2 rounded-full bg-white dark:bg-gray-800 dark:text-orange-300 text-orange-700 hover:bg-orange-100 dark:hover:bg-gray-700 transition"
          >
            {t("verifiedPandits.seeAll", "See All PanditJis")}
          </button>
        </div>

        {/* RIGHT GRID SECTION */}
        <div className="md:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pandits.map((pandit) => (
            <div
              key={pandit._id}
              className="bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-600 rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={getPanditImageUrl(pandit.imageUrl)}
                alt={pandit.name}
                className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-200"
                onError={(e) => (e.target.src = "/default-pandit.png")}
              />
              <h3 className="text-base font-semibold text-orange-800 dark:text-orange-300 line-clamp-1">
                {pandit.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                {pandit.expertise}
              </p>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-600 dark:text-gray-300">
                <span>{pandit.experience}+ yrs</span>
                {renderStars(pandit.rating)}
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-2 line-clamp-3 h-[42px]">
                {pandit.bio || t("verifiedPandits.defaultBio", "Vedic scholar with years of experience in puja and astrology. Fluent in Sanskrit.")}
              </p>
              <button
                onClick={() => handleBookPandit(pandit.name)}
                className="mt-3 w-full bg-red-600 hover:bg-orange-700 text-white text-xs py-1.5 rounded-full font-semibold transition"
              >
                {t("verifiedPandits.bookNow", "Book Now")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerifiedPanditJis;
