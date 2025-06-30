// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLiveHome } from "../../../services/user/live.Services";

const LiveBhajan = () => {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTopBhajans = async () => {
    try {
      setLoading(true);
      const res = await getLiveHome();
      setBhajans(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load bhajans. Showing fallback content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopBhajans();
    const interval = setInterval(fetchTopBhajans, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-12">
          Live Darshan & Kirtan
        </h2>

        {loading && (
          <p className="text-lg text-gray-600 animate-pulse">Loading bhajans...</p>
        )}
        {error && (
          <p className="text-yellow-600 font-medium mb-4">⚠️ {error}</p>
        )}

        {!loading && bhajans.length === 0 && !error && (
          <p className="text-gray-500">No bhajans available at the moment.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bhajans.map((item, i) => (
            <Link
              key={i}
              to={`/live/${item.videoId}`}
              className="block group transition-transform hover:scale-[1.01]"
            >
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition overflow-hidden border border-gray-200 flex flex-col h-full">
                <div className="relative w-full h-56">
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
                      item.isLive ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <span className="text-xs">{item.isLive ? "🔴" : "⏳"}</span>
                    {item.isLive ? "LIVE" : "Not Live"}
                  </div>
                </div>

                <div className="p-5 text-left flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-[#4A1C1C] mb-2">
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

        <div className="mt-10">
          <button
            onClick={() => navigate("/live-bhajans")}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition"
          >
            View More Bhajans
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveBhajan;
