// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLiveAll } from "@/services/user/live.Services";
import axios from "axios";

const AllLiveBhajans = () => {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showOnlyLive, setShowOnlyLive] = useState(false);

  const fetchAllBhajans = async () => {
    setLoading(true);
    try {
      const res = await getLiveAll();
      const data = Array.isArray(res?.data) ? res.data : [];

      const enriched = await Promise.all(
        data.map(async (item) => {
          let fallbackName = item.title || "Bhajan";
          let channelAvatar = item.channelAvatar;
          let thumbnail = item.image;

          try {
            const ytRes = await axios.get(
              `https://www.youtube.com/oembed?url=https://www.youtube.com/channel/${item.channelId}&format=json`
            );
            channelAvatar =
              ytRes.data?.thumbnail_url ||
              `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;

            if (!item.isLive) {
              thumbnail = ytRes.data?.thumbnail_url || `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;
            } else {
              thumbnail = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
            }
          } catch {
            channelAvatar = `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;
            thumbnail = `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;
          }

          return {
            ...item,
            views: item.views || Math.floor(Math.random() * 9000 + 1000),
            hoursAgo: item.hoursAgo || Math.floor(Math.random() * 24 + 1),
            channelAvatar,
            thumbnail,
          };
        })
      );

      setBhajans(enriched);
    } catch (err) {
      console.error("❌ Error fetching bhajans", err);
      setBhajans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBhajans();
    const interval = setInterval(fetchAllBhajans, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredBhajans = bhajans
    .filter((b) => b.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => (showOnlyLive ? b.isLive : true));

  return (
    <div className="py-12 px-4 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 dark:text-yellow-400 mb-8 text-center">
          🎥 All Live Bhajans & Darshans
        </h1>

        {/* Search + Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={showOnlyLive}
              onChange={(e) => setShowOnlyLive(e.target.checked)}
              className="accent-red-600 w-4 h-4"
            />
            Show Only Live
          </label>
        </div>

        {/* State Info */}
        {loading ? (
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center animate-pulse">
            Loading bhajans...
          </p>
        ) : filteredBhajans.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No bhajans found {search && `for "${search}"`}
            {showOnlyLive && " (Live filter applied)"}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBhajans.map((item, i) => {
              if (!item.videoId) return null;

              return (
                <Link
                  key={i}
                  to={`/live/${item.videoId}`}
                  className="block group"
                >
                  <div className="flex flex-col">
                    <div className="aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className={`w-full h-full object-cover ${
                          !item.isLive ? "grayscale opacity-80" : ""
                        } transition-transform group-hover:scale-105`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/400x250?text=No+Thumbnail";
                        }}
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.isLive ? "🔴 LIVE" : "⏳ Not Live"}
                      </div>
                    </div>

                    <div className="mt-3">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-red-700 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {item.description?.slice(0, 100) || "Spiritual Bhajan Stream"}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <img
                          src={item.channelAvatar}
                          alt="channel-avatar"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {item.title || "Bhakti Channel"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.views.toLocaleString()} views • {item.hoursAgo} hours ago
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLiveBhajans;
