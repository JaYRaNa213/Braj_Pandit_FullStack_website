// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLiveAll } from "@/services/user/live.Services";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ShimmerCard = () => (
  <div className="animate-pulse bg-white dark:bg-[#1f1f1f] rounded-xl border border-gray-200 dark:border-gray-700 shadow">
    <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-t-xl" />
    <div className="p-4 space-y-2">
      <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-500 rounded"></div>
      <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-500 rounded"></div>
    </div>
  </div>
);

const AllLiveBhajans = () => {
  const { t } = useTranslation();
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
          const fallbackName = item.title || "Bhajan";
          let channelAvatar = item.channelAvatar;
          let thumbnail = item.image;

          try {
            const ytRes = await axios.get(
              `https://www.youtube.com/oembed?url=https://www.youtube.com/channel/${item.channelId}&format=json`
            );
            channelAvatar =
              ytRes.data?.thumbnail_url ||
              `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;

            thumbnail = item.isLive
              ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
              : ytRes.data?.thumbnail_url ||
                `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;
          } catch {
            channelAvatar = `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;
            thumbnail = `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;
          }

          return {
            ...item,
            views: item.views || `${Math.floor(Math.random() * 900 + 100)}K`,
            timeAgo: item.timeAgo || `${Math.floor(Math.random() * 10 + 1)} ${t("homelive.days_ago", "days ago")}`,
            channelName: item.channelName || fallbackName,
            channelAvatar,
            image: thumbnail,
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

  const BhajanCard = ({ item }) => {
    const isLive = item.isLive;
    const liveLabel = t("homelive.live", "🔴 LIVE");
    const notLiveLabel = t("homelive.not_live", "⏳ Not Live");

    return (
      <Link
        to={`/live/${item.videoId}`}
        className="group bg-white dark:bg-[#1f1f1f] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow hover:shadow-[0_0_20px_#facc15] transition-all duration-300"
      >
        <div className="relative aspect-video bg-black overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isLive ? "" : "opacity-80 grayscale"}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/offline-bhajan.jpg";
            }}
          />
          <span
            className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-semibold ${
              isLive ? "bg-red-600 text-white" : "bg-gray-600 text-white"
            }`}
          >
            {isLive ? liveLabel : notLiveLabel}
          </span>
        </div>

        <div className="flex p-3 gap-3 items-start">
          <img
            src={item.channelAvatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-yellow-100 line-clamp-2 leading-snug">
              {item.title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {item.channelName}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {item.views} {t("homelive.views", "views")} • {item.timeAgo}
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-[#fffceb] to-[#fef9f3] dark:from-[#0f0f0f] dark:to-[#1a1a1a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 dark:text-yellow-400 mb-8 text-center">
          {t("all_live_darshan", "All Live Darshan")}
        </h1>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder={t("search_placeholder", "Search bhajans...")}
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
            {t("show_only_live", "Show only live")}
          </label>
        </div>

        {/* Loader / Error / Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        ) : filteredBhajans.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            {t("homelive.empty", "No bhajans found.")}
            {search && ` "${search}"`}
            {showOnlyLive && ` (${t("live_filter_applied", "Live filter applied")})`}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBhajans.map((item, i) => (
              <BhajanCard key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLiveBhajans;
