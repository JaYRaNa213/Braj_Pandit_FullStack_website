// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLiveAll } from "@/services/user/live.Services";

const AllLiveBhajans = () => {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAllBhajans = async () => {
    setLoading(true);
    try {
      const res = await getLiveAll();
      // ✅ FIX: Make sure we're getting an array from res.data
      setBhajans(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching bhajans", err);
      setBhajans([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBhajans();
    const interval = setInterval(fetchAllBhajans, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredBhajans = bhajans.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-red-700 mb-8">
          All Live Darshans & Bhajans
        </h1>

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full max-w-md px-4 py-2 border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        {loading ? (
          <p className="text-lg text-gray-600 animate-pulse">Loading bhajans...</p>
        ) : filteredBhajans.length === 0 ? (
          <p className="text-gray-500">No bhajans found for "{search}"</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10 px-2 md:px-6">
            {filteredBhajans.map((item, i) => (
              <Link
                key={i}
                to={`/live/${item.videoId}`}
                className="block transition-transform hover:scale-[1.015]"
              >
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition overflow-hidden border border-gray-200 flex flex-col h-full">
                  <div className="relative w-full h-[280px]">
                    {item.isLive ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1`}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={item.title}
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 shadow ${
                        item.isLive
                          ? "bg-red-600 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      <span>{item.isLive ? "🔴" : "⏳"}</span>
                      {item.isLive ? "LIVE" : "Not Live"}
                    </div>
                  </div>

                  <div className="p-5 text-left flex-1">
                    <h3 className="text-xl font-semibold text-[#4A1C1C] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {item.description?.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLiveBhajans;
