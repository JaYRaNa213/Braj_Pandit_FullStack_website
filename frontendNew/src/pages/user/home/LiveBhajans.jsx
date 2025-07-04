// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLiveHome } from "../../../services/user/live.Services";
import axios from "axios";
import { useTranslation } from "react-i18next";

const LiveBhajan = () => {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ⛳ Thumbnail fetcher
  const getThumbnail = async (channelId, fallbackName) => {
    try {
      const { data } = await axios.get(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/channel/${channelId}&format=json`
      );
      return data?.thumbnail_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=random`;
    } catch {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=random`;
    }
  };

  useEffect(() => {
    const fetchBhajans = async () => {
      try {
        setLoading(true);
        const res = await getLiveHome();
        const raw = Array.isArray(res?.data) ? res.data : [];

        const enriched = await Promise.all(
          raw.map(async (item) => {
            const fallbackName = item.title || "Bhajan";
            const channelAvatar = item.channelAvatar || await getThumbnail(item.channelId, fallbackName);
            const image = item.isLive
              ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
              : await getThumbnail(item.channelId, fallbackName);

            return {
              ...item,
              views: item.views || `${Math.floor(Math.random() * 900 + 100)}K`,
              timeAgo: item.timeAgo || `${Math.floor(Math.random() * 10 + 1)} ${t("homelive.days_ago")}`,
              channelName: item.channelName || fallbackName,
              channelAvatar,
              image,
            };
          })
        );

        setBhajans(enriched);
        setError(null);
      } catch (err) {
        console.error("Failed to load live bhajans:", err.message);
        setError(t("homelive.error"));
        setBhajans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBhajans();
  }, [t]);

  const BhajanCard = ({ item }) => {
    const isLive = item.isLive;
    const thumbnail = item.image;

    return (
      <Link
        to={`/live/${item.videoId}`}
        className="group bg-white dark:bg-[#1f1f1f] rounded-xl overflow-hidden border-2 border-yellow-400 dark:border-orange-400 hover:shadow-lg transition-all duration-300"
      >
        <div className="relative w-full aspect-video bg-black">
          <img
            src={thumbnail}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              isLive ? "" : "opacity-80 grayscale"
            }`}
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
            {isLive ? "🔴 " + t("homelive.live") : "⏳ " + t("homelive.not_live")}
          </span>
        </div>

        <div className="flex p-3 gap-3 items-start">
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
              {item.views} {t("homelive.views")} • {item.timeAgo}
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
          {t("homelive.title")}
        </h2>

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
            {t("homelive.loading")}
          </p>
        )}
        {error && (
          <p className="text-center text-yellow-600 dark:text-yellow-400 font-medium">
            ⚠️ {error}
          </p>
        )}
        {!loading && bhajans.length === 0 && !error && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("homelive.empty")}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
          {bhajans.map((item, i) => (
            <BhajanCard key={i} item={item} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/live-bhajans")}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            {t("homelive.view_more")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveBhajan;
