import React, { useEffect, useState } from "react";
import { getAllPandits } from "../../../services/user/panditService";
import { Link, useNavigate } from "react-router-dom";

// Get rating from localStorage
const getRating = (name) => {
  const count = parseInt(localStorage.getItem(`clicks_${name}`)) || 0;
  return Math.min((count / 10).toFixed(1), 5);
};

// Increment rating tracker on click
const incrementClick = (name) => {
  const key = `clicks_${name}`;
  const prev = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, prev + 1);
};

const VerifiedPanditJis = () => {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await getAllPandits();
        const verified = res?.data?.filter(
          (p) => p.status?.toLowerCase() === "approved"
        );

        const withRatings = (verified || []).map((p) => ({
          ...p,
          rating: parseFloat(getRating(p.name)),
        }));

        const sorted = withRatings.sort((a, b) => b.rating - a.rating);
        setPandits(sorted.slice(0, 8));
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
    navigate(
      `/booking?pandit=${encodeURIComponent(
        panditName
      )}&service=${encodeURIComponent("Bhagwat Katha")}`
    );
  };

  if (loading) {
    return <div className="p-6 text-center">Loading Pandits...</div>;
  }

  const topPanditName = pandits[0]?.name;

  return (
    <section id="verifiedPandits" className="bg-white px-4 md:px-16 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Section */}
        <div className="space-y-6">
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

        {/* Right Section */}
        <div className="w-full">
          {pandits.length === 0 ? (
            <p className="text-gray-500 text-sm">No verified Pandits available.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pandits.map((pandit) => (
                <div
                  key={pandit._id}
                  className="relative bg-[#F9F3F1] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  {pandit.name === topPanditName && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-semibold shadow">
                      🔥 Most Booked
                    </span>
                  )}
                  <img
                    src={pandit.imageUrl}
                    alt={pandit.name}
                    className="w-full h-[120px] object-cover"
                  />
                  <div className="p-2 text-[#4A1C1C]">
                    <h3 className="text-sm font-semibold">{pandit.name}</h3>
                    <p className="text-xs">{pandit.expertise}</p>
                    <div className="text-[10px] flex justify-between mt-1 text-gray-700">
                      <span>{pandit.experience}</span>
                      <span>{pandit.location}</span>
                    </div>
                    <p className="text-[11px] mt-1 text-yellow-600 font-semibold">
                      ⭐ {pandit.rating}/5 Rating
                    </p>
                    <button
                      onClick={() => handleBookPandit(pandit.name)}
                      className="mt-2 bg-blue-600 px-3 py-1.5 text-white rounded hover:bg-blue-700 w-full text-xs font-medium"
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
