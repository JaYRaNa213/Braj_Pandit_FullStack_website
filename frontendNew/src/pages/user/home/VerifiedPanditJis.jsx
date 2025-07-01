// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { getAllPandits } from "../../../services/user/panditService";
import { Link, useNavigate } from "react-router-dom";

// ⭐ Helpers
const getRating = (name) => {
  const count = parseInt(localStorage.getItem(`clicks_${name}`)) || 0;
  return Math.min((count / 10).toFixed(1), 5);
};

const incrementClick = (name) => {
  const key = `clicks_${name}`;
  const prev = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, prev + 1);
};

const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex text-yellow-400 text-sm gap-[2px]">
      {Array(full).fill().map((_, i) => <span key={`f-${i}`}>★</span>)}
      {half && <span>☆</span>}
      {Array(empty).fill().map((_, i) => <span key={`e-${i}`}>☆</span>)}
    </div>
  );
};

const ShimmerCard = () => (
  <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow p-4 flex flex-col">
    <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-full mt-auto"></div>
  </div>
);

const VerifiedPanditJis = () => {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await getAllPandits();
        const verified = res?.data?.filter((p) => p.status?.toLowerCase() === "approved");
        const withRatings = (verified || []).map((p) => ({
          ...p,
          rating: parseFloat(getRating(p.name)),
        }));
        const sorted = withRatings.sort((a, b) => b.rating - a.rating);
        setPandits(sorted.slice(0, 8)); // ✅ Only 8
      } catch (err) {
        console.error("Error fetching pandits", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPandits();
  }, []);

  const handleBookPandit = (name) => {
    incrementClick(name);
    navigate(
      `/booking?pandit=${encodeURIComponent(name)}&service=${encodeURIComponent("Bhagwat Katha")}`
    );
  };

  return (
    <section className="bg-white dark:bg-gray-900 px-4 md:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        ) : (
          <div className="lg:flex lg:items-start lg:gap-10">
            {/* 📌 Left Side: Heading & Description */}
            <div className="lg:w-1/3 mb-10 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#4A1C1C] dark:text-yellow-200">
                Our <span className="text-red-600 dark:text-red-400">Top-Rated</span> PanditJi
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-3 text-lg">
                Book highly knowledgeable Vedic Pandits and Purohits, well-versed in Sanskrit
                mantras, Hindu scriptures, and astrology.
              </p>
              <Link to="/pandits">
                <button className="mt-6 bg-transparent border-2 border-[#4A1C1C] dark:border-yellow-300 text-[#4A1C1C] dark:text-yellow-300 font-semibold px-6 py-2 rounded-full hover:bg-[#4A1C1C] dark:hover:bg-yellow-400 hover:text-white dark:hover:text-black transition">
                  See All PanditJis
                </button>
              </Link>
            </div>

            {/* 📌 Right Side: Grid of 8 Cards in 2 Rows x 4 Columns */}
            <div className="lg:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {pandits.map((pandit) => (
                <div
                  key={pandit._id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition border border-gray-200 dark:border-gray-600 flex flex-col"
                >
                  <img
                    src={pandit.imageUrl}
                    alt={pandit.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                  <div className="bg-orange-100 dark:bg-gray-700 p-4 flex flex-col justify-between flex-1 text-[#4A1C1C] dark:text-yellow-100">
                    <div>
                      <h3 className="text-[15px] font-semibold truncate">{pandit.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{pandit.expertise}</p>

                      <div className="flex flex-col items-end mt-3">
                        <span className="text-[11px] text-gray-700 dark:text-gray-300 font-medium mb-0.5">
                          {pandit.rating}
                        </span>
                        <div className="flex justify-between w-full items-center text-[12px] text-gray-600 dark:text-gray-300">
                          <span>{pandit.experience} years exp</span>
                          {renderStars(pandit.rating)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookPandit(pandit.name)}
                      className="mt-4 bg-red-600 hover:bg-orange-700 text-white px-3 py-1 text-xs rounded font-medium transition"
                    >
                      Book Pandit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifiedPanditJis;
