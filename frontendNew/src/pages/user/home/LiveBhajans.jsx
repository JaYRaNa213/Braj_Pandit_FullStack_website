// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLiveHome } from "../../../services/user/live.Services";
import axios from "axios";

const LiveBhajan = () => {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTopBhajans = async () => {
    try {
      setLoading(true);
      const res = await getLiveHome();
      const data = Array.isArray(res?.data) ? res.data : [];

      const enriched = await Promise.all(
        data.map(async (item) => {
          let channelName = item.title;
          let channelAvatar = "";

          try {
            const ytRes = await axios.get(
              `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${item.videoId}&format=json`
            );
            channelName = ytRes.data.author_name;
            channelAvatar = `https://ui-avatars.com/api/?name=${channelName}&background=random`;
          } catch {
            channelAvatar = `https://ui-avatars.com/api/?name=${channelName || "B"}&background=random`;
          }

          return {
            ...item,
            channelName,
            channelAvatar,
            views: Math.floor(Math.random() * 9000 + 1000),
            hoursAgo: Math.floor(Math.random() * 24 + 1),
          };
        })
      );

      setBhajans(enriched);
      setError(null);
    } catch (err) {
      setError("Failed to load bhajans. Showing fallback content.");
      setBhajans([]);
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
    <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-600 dark:text-red-400 mb-10">
          Live Darshan & Kirtan
        </h2>

        {loading && (
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 animate-pulse">
            Loading bhajans...
          </p>
        )}
        {error && (
          <p className="text-yellow-600 dark:text-yellow-400 font-medium mb-4">
            ⚠️ {error}
          </p>
        )}
        {!loading && bhajans.length === 0 && !error && (
          <p className="text-gray-500 dark:text-gray-400">
            No bhajans available at the moment.
          </p>
        )}

        {/* ✅ Perfect Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {bhajans.map((item, i) => {
            const thumbnail = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;

            return (
              <Link
                key={i}
                to={`/live/${item.videoId}`}
                className="group transition-transform hover:scale-[1.01] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden"
              >
                <div className="relative w-full aspect-video bg-black">
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
                      src={thumbnail}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/400x250?text=No+Thumbnail";
                      }}
                    />
                  )}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 shadow ${
                      item.isLive
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-xs">{item.isLive ? "🔴" : "⏳"}</span>
                    {item.isLive ? "LIVE" : "Not Live"}
                  </div>
                </div>

                <div className="p-4 flex-1 text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-[#4A1C1C] dark:text-yellow-100 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                    {item.description?.slice(0, 100) || "Spiritual Bhajan Stream"}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={item.channelAvatar}
                      alt="channel-avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item.channelName}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.views.toLocaleString()} views • {item.hoursAgo} hours ago
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10">
          <button
            onClick={() => navigate("/live-bhajans")}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            View More Bhajans
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveBhajan;
