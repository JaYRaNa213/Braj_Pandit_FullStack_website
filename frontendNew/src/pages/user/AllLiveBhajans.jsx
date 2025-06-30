// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLiveAll } from "@/services/user/live.Services";
import axios from "axios";

const AllLiveBhajans = () => {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAllBhajans = async () => {
    setLoading(true);
    try {
      const res = await getLiveAll();
      const data = Array.isArray(res?.data) ? res.data : [];

      const enriched = await Promise.all(
        data.map(async (item) => {
          let title = item.title;
          let channelAvatar = null;

          try {
            const ytRes = await axios.get(
              `https://www.youtube.com/oembed?url=https://www.youtube.com/channel/${item.channelId}&format=json`
            );
            title = ytRes.data.author_name || title;
            channelAvatar = `https://yt3.googleusercontent.com/ytc/${item.channelId}=s68-c-k-c0x00ffffff-no-rj`;
          } catch {
            // fallback if fetch fails
            channelAvatar = `https://ui-avatars.com/api/?name=${title?.charAt(0) || "Y"}&background=random`;
          }

          return {
            ...item,
            title,
            views: Math.floor(Math.random() * 10000 + 1000), // placeholder
            hoursAgo: Math.floor(Math.random() * 24 + 1), // placeholder
            channelAvatar,
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

  const filteredBhajans = bhajans.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-8 text-center">
          🎥 All Live Bhajans & Darshans
        </h1>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {loading ? (
          <p className="text-lg text-gray-600 text-center animate-pulse">Loading bhajans...</p>
        ) : filteredBhajans.length === 0 ? (
          <p className="text-gray-500 text-center">No bhajans found for "{search}"</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBhajans.map((item, i) => {
              const thumbnailURL = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;

              return (
                <Link key={i} to={`/live/${item.videoId}`} className="block group">
                  <div className="flex flex-col">
                    {/* Video or thumbnail */}
                    <div className="aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition">
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
                          src={thumbnailURL}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}

                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.isLive ? "🔴 LIVE" : "⏳ Not Live"}
                      </div>
                    </div>

                    {/* Video info */}
                    <div className="mt-3">
                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-red-700 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {item.description?.slice(0, 100) || "Spiritual Bhajan Stream"}
                      </p>

                      {/* Channel and stats */}
                      <div className="flex items-center gap-2 mt-3">
                        <img
                          src={item.channelAvatar}
                          alt="channel-avatar"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-700">{item.title}</span>
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
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
