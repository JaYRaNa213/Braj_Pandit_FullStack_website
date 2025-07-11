// 🔐 Code developed by Jay Rana © 2025. Full Custom UI/UX Redesign by ChatGPT (YouTube-style Cards Edition)

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLiveHome } from "../../../services/user/live.Services";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const getThumbnail = async (channelId, fallbackName) => {
  try {
    const { data } = await axios.get(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/channel/${channelId}&format=json`
    );
    return (
      data?.thumbnail_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=random`
    );
  } catch {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=random`;
  }
};

const ShimmerCard = () => (
  <div className="w-[360px] bg-white dark:bg-[#1e1e1e] rounded-xl border border-yellow-100 dark:border-yellow-600 dark:shadow-[0_0_12px_#facc15] shadow animate-pulse">
    <div className="h-[202px] bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-gray-700 dark:to-gray-800 rounded-t-xl" />
    <div className="p-4 space-y-2">
      <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="w-1/2 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="w-2/3 h-3 bg-gray-200 dark:bg-gray-500 rounded"></div>
    </div>
  </div>
);

const BhajanCard = ({ item, t }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  if (!inView) return <div ref={ref} className="w-[360px]" />;

  return (
    <Link
      ref={ref}
      to={`/live/${item.videoId}`}
      className="w-[360px] flex-shrink-0 bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden border border-orange-200 dark:border-yellow-600 shadow hover:shadow-[0_0_15px_#fbbf24] dark:hover:shadow-[0_0_20px_#facc15] hover:scale-[1.02] transition-all duration-300 snap-start"
    >
      <div className="relative w-full h-[202px] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${item.isLive ? "" : "opacity-80 grayscale"}`}
          onError={(e) => (e.target.src = "/offline-bhajan.jpg")}
        />
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded-full shadow animate-pulse ${item.isLive ? "bg-red-600 text-white" : "bg-gray-600 text-white"}`}
        >
          {item.isLive ? "🔴 " + t("homelive.live") : "⏳ " + t("homelive.not_live")}
        </span>
      </div>

      <div className="p-4 font-['Baloo Bhai 2']">
        <h3 className="text-base font-semibold text-[#b45309] dark:text-yellow-100 line-clamp-2">
          {item.title}
        </h3>
        <div className="flex items-center gap-3 mt-3">
          <img
            src={item.channelAvatar}
            alt="avatar"
            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-500 object-cover"
          />
          <span className="text-sm text-gray-700 dark:text-gray-400 truncate">
            {item.channelName}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {item.views} {t("homelive.views")} • {item.timeAgo}
        </p>
      </div>
    </Link>
  );
};

const LiveBhajan = () => {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBhajans = async () => {
      try {
        const res = await getLiveHome();
        const raw = Array.isArray(res?.data) ? res.data : [];

        const enriched = await Promise.all(
          raw.map(async (item) => {
            const fallbackName = item.title || "Bhajan";
            const channelAvatar = item.channelAvatar || (await getThumbnail(item.channelId, fallbackName));
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

        setBhajans(enriched.slice(0, 8));
        setError(null);
      } catch (err) {
        console.error("Failed to load live bhajans:", err.message);
        setError(t("homelive.error"));
      } finally {
        setLoading(false);
      }
    };

    fetchBhajans();
  }, [t]);

  return (
    <section className="py-20 bg-gradient-to-br from-[#fffceb] to-[#fef9f3] dark:from-[#1a1a1a] dark:to-[#2a2a2a]">
      <div className="px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-700 dark:text-yellow-300 font-['Baloo Bhai 2']">
             {t("homelive.title")}
          </h2>
          <button
            onClick={() => navigate("/live-bhajans")}
            className="text-sm text-orange-600 hover:text-orange-800 dark:text-yellow-400 dark:hover:text-yellow-300 font-semibold transition-transform hover:translate-x-1 duration-300"
          >
            {t("homelive.view_more")} →
          </button>
        </div>

        {loading && (
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {[...Array(6)].map((_, i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-yellow-700 dark:text-yellow-400 font-medium">
            ⚠️ {error}
          </p>
        )}

        {!loading && bhajans.length === 0 && !error && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("homelive.empty")}
          </p>
        )}

        {!loading && bhajans.length > 0 && (
  <div className="relative">
    {/* 🧼 Removed blur gradient sides */}
    <div
      ref={scrollRef}
      className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 relative z-0 px-2"
    >
      {bhajans.map((item, i) => (
        <BhajanCard key={i} item={item} t={t} />
      ))}
    </div>
  </div>
)}

      </div>
    </section>
  );
};

export default LiveBhajan;