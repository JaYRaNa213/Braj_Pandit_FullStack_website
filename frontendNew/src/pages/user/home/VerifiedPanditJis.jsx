// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { getAllPandits } from "../../../services/user/panditService";
import { Link, useNavigate } from "react-router-dom";

// Get rating from localStorage
const getRating = (name) => {
  const count = parseInt(localStorage.getItem(`clicks_${name}`)) || 0;
  return Math.min((count / 10).toFixed(1), 5);
};

// Click tracker
const incrementClick = (name) => {
  const key = `clicks_${name}`;
  const prev = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, prev + 1);
};

// Render star rating
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500 text-sm gap-[2px]">
      {Array(fullStars).fill().map((_, i) => <span key={`full-${i}`}>★</span>)}
      {halfStar && <span>☆</span>}
      {Array(emptyStars).fill().map((_, i) => <span key={`empty-${i}`}>☆</span>)}
    </div>
  );
};

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
        setPandits(sorted.slice(0, 6)); // Only top 6
      } catch (err) {
        console.error("Error fetching pandits", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPandits();
  }, []);

  const handleBookPandit = (panditName) => {
    incrementClick(panditName);
    navigate(`/booking?pandit=${encodeURIComponent(panditName)}&service=${encodeURIComponent("Bhagwat Katha")}`);
  };

  if (loading) return <div className="p-6 text-center">Loading Pandits...</div>;

  return (
    <section id="verifiedPandits" className="bg-white px-4 md:px-8 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Info */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-[#4A1C1C]">
            Our <span className="text-red-600">Top-Rated</span> PanditJi
          </h2>
          <p className="text-gray-700 text-lg">
            Book highly knowledgeable Vedic Pandits and Purohits, well-versed in
            Sanskrit mantras, Hindu scriptures, and astrology.
          </p>
          <Link to="/pandits">
            <button className="mt-4 bg-transparent border-2 border-[#4A1C1C] text-[#4A1C1C] font-semibold px-6 py-2 rounded-full hover:bg-[#4A1C1C] hover:text-white transition">
              See All PanditJis
            </button>
          </Link>
        </div>

        {/* Pandit Cards */}
        <div className="w-full">
          {pandits.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No verified Pandits available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pandits.map((pandit) => (
                <div
                  key={pandit._id}
                  className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 border border-gray-200 flex flex-col"
                >
                  {/* Image */}
                  <img
                    src={pandit.imageUrl}
                    alt={pandit.name}
                    className="w-full w-full h-32 object-cover rounded-t-xl"
                  />

                  {/* Content */}
                  <div className="bg-orange-200 p-4 flex flex-col justify-between flex-1 text-[#4A1C1C]">
                    <div>
                      <h3 className="text-[15px] font-semibold truncate">
                        {pandit.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {pandit.expertise}
                      </p>

                      {/* Rating Format */}
                      <div className="flex flex-col items-end mt-3">
                        <span className="text-[11px] text-gray-700 font-medium mb-0.5">
                          {pandit.rating}
                        </span>
                        <div className="flex justify-between w-full items-center text-[12px] text-gray-600">
                          <span>{pandit.experience} years exp</span>
                          {renderStars(pandit.rating)}
                        </div>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => handleBookPandit(pandit.name)}
                      className="mt-4 bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-orange-700 font-medium"
                    >
                      Book Pandit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerifiedPanditJis;
