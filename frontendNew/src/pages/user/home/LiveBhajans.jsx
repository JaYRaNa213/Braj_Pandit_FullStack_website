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

      const sorted = [...enriched].sort((a, b) => b.isLive - a.isLive);
      setBhajans(sorted);
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

  useEffect(() => {
    const slider = document.querySelector(".live-scroll");
    if (!slider) return;
    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      slider.scrollLeft += e.deltaY;
    };
    slider.addEventListener("wheel", handleWheel);
    return () => slider.removeEventListener("wheel", handleWheel);
  }, []);

  const BhajanCard = ({ item }) => {
    const thumbnail = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;

    return (
      <Link
        to={`/live/${item.videoId}`}
        className="group bg-white dark:bg-[#1f1f1f] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
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
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x250?text=No+Thumbnail";
              }}
            />
          )}
          <span
            className={`absolute top-2 left-2 text-[11px] font-semibold px-2 py-0.5 rounded-full shadow ${
              item.isLive
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {item.isLive ? "🔴 LIVE" : "⏳ Not Live"}
          </span>
        </div>

        <div className="flex p-3 sm:p-4 gap-3 items-start">
          <img
            src={item.channelAvatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-yellow-100 line-clamp-2 leading-snug">
              {item.title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {item.channelName}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {item.views.toLocaleString()} views • {item.hoursAgo}h ago
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 w-full">
      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-600 dark:text-red-400 mb-10">
          Live Darshan & Kirtan
        </h2>

        {loading && (
          <p className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-300 animate-pulse">
            Loading bhajans...
          </p>
        )}
        {error && (
          <p className="text-center text-yellow-600 dark:text-yellow-400 font-medium mb-4">
            ⚠️ {error}
          </p>
        )}
        {!loading && bhajans.length === 0 && !error && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No bhajans available at the moment.
          </p>
        )}

        {/* 📱 Mobile - Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto live-scroll hide-scrollbar -mx-2 px-2 pb-4">
          <div className="flex gap-4">
            {bhajans.map((item, i) => (
              <div key={i} className="min-w-[260px] flex-shrink-0">
                <BhajanCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* 🖥️ Desktop - Grid View */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {bhajans.slice(0, 8).map((item, i) => (
            <BhajanCard key={i} item={item} />
          ))}
        </div>

        {/* 🔽 View More Button */}
        <div className="mt-10 text-center">
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
