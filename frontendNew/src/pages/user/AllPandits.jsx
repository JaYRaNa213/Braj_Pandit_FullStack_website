// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { getAllPandits } from "../../services/user/panditService";
import { useNavigate } from "react-router-dom";

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
  const stars = [];
  const rounded = Math.floor(rating);
  const hasHalf = rating - rounded >= 0.5;
  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) stars.push(<span key={i}>⭐</span>);
    else if (i === rounded + 1 && hasHalf) stars.push(<span key={i}>⭐</span>);
    else stars.push(<span key={i}>☆</span>);
  }
  return stars;
};

const AllPandits = () => {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await getAllPandits();
        const verified = res?.data?.filter((p) => p.status?.toLowerCase() === "approved") || [];
        const withRatings = verified.map((p) => ({ ...p, rating: parseFloat(getRating(p.name)) }));
        const sorted = withRatings.sort((a, b) => b.rating - a.rating);
        setPandits(sorted);
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
    navigate(`/booking?pandit=${encodeURIComponent(name)}&service=${encodeURIComponent("Bhagwat Katha")}`);
  };

  if (loading) return <div className="p-6 text-center">Loading Pandits...</div>;

  return (
    <section className="bg-white dark:bg-gray-900 px-4 md:px-16 py-10">
      

      <h2 className="text-3xl font-bold mb-6 text-[#4A1C1C] dark:text-white text-center">
        All <span className="text-red-600">Verified</span> Pandits
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pandits.map((p) => (
          <div
            key={p._id}
            className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 flex flex-col border border-gray-200 dark:border-gray-700"
          >
            <div className="w-full h-40 overflow-hidden">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-full object-cover rounded-t-xl"
              />
            </div>
            <div className="bg-orange-200 dark:bg-gray-700 p-3 flex flex-col flex-1 text-[#4A1C1C] dark:text-gray-100">
              <h3 className="text-sm font-semibold truncate">{p.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">{p.expertise}</p>
              <div className="flex justify-between items-center mt-2 text-[11px] text-gray-700 dark:text-gray-300">
                <span>{p.experience} years exp.</span>
                <div className="flex flex-col items-center text-yellow-600">
                  <span className="text-[10px] text-gray-600 dark:text-gray-300 font-semibold">{p.rating}</span>
                  <div className="text-sm">{renderStars(p.rating)}</div>
                </div>
              </div>
              <button
                onClick={() => handleBookPandit(p.name)}
                className="mt-auto bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-orange-700 font-medium mt-4"
              >
                Book Pandit
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllPandits;
