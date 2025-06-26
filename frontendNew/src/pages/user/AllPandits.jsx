// src/pages/user/AllPandits.jsx
import React, { useEffect, useState } from "react";
import { getAllPandits } from "../../services/user/panditService";
import { Link, useNavigate } from "react-router-dom";

const AllPandits = () => {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllPandits();
        setPandits(res?.data || []);
      } catch (err) {
        console.error("Error fetching pandits", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filteredPandits = pandits.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter =
      filter === "All" ||
      p.location.toLowerCase().includes(filter.toLowerCase()) ||
      p.expertise.toLowerCase().includes(filter.toLowerCase());
    return matchSearch && matchFilter;
  });

  if (loading)
    return <div className="p-10 text-center text-orange-600 text-lg font-semibold">Loading pandits...</div>;

  return (
    <div className="p-8 bg-[#FFF8E1] min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-orange-700">
        All Verified Pandits
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Search pandit by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded"
        >
          <option value="All">All Locations/Expertise</option>
          {[...new Set(pandits.map((p) => p.location))].map((loc, idx) => (
            <option key={idx} value={loc}>{loc}</option>
          ))}
          {[...new Set(pandits.map((p) => p.expertise))].map((exp, idx) => (
            <option key={idx + 100} value={exp}>{exp}</option>
          ))}
        </select>
      </div>

      {filteredPandits.length === 0 ? (
        <div className="text-center text-gray-600">No matching pandits found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredPandits.map((pandit) => (
            <div
              key={pandit._id}
              className="bg-white border border-orange-100 rounded-2xl shadow-md hover:shadow-xl hover:border-orange-400 transform hover:-translate-y-1 transition duration-300 overflow-hidden"
            >
              <img
                src={pandit.imageUrl}
                alt={pandit.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4 text-[#4A1C1C]">
                <h3 className="text-xl font-semibold mb-1">{pandit.name}</h3>
                <p className="text-sm text-gray-700 mb-1">{pandit.expertise}</p>
                <div className="text-xs text-gray-600 mb-4">
                  {pandit.experience} &bull; {pandit.location}
                </div>
                <button
                  className="bg-red-700 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => navigate(`/booking?pandit=${encodeURIComponent(pandit.name)}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPandits;
