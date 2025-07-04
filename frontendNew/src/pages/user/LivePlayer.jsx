// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LivePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [title, setTitle] = useState(t("live.loadingTitle"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isValidId = id && id !== "recorded";

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isValidId) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchTitle = async () => {
      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
        );
        if (!res.ok) throw new Error("Invalid video");
        const data = await res.json();
        setTitle(data.title);
      } catch {
        setTitle(t("live.defaultTitle"));
      } finally {
        setLoading(false);
      }
    };

    fetchTitle();
  }, [id, t]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full flex flex-col items-center gap-8">
        <div className="absolute top-6 right-6">
          <button
            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
            className="text-sm px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full transition"
          >
            {i18n.language === "en" ? "हिंदी में देखें" : "View in English"}
          </button>
        </div>

        {loading ? (
          <p className="text-lg text-gray-300 animate-pulse">{t("live.loading")}</p>
        ) : error || !isValidId ? (
          <div className="bg-white dark:bg-gray-900 text-center p-8 rounded-xl shadow-xl w-full max-w-xl">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              🔕 {t("live.noStream")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t("live.noStreamDesc")}
            </p>
            <button
              onClick={() => navigate("/live-bhajans")}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-full font-medium transition"
            >
              🔙 {t("live.back")}
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
              🎵 {title}
            </h1>
            <div className="relative w-full aspect-video max-h-[80vh] rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=0&rel=0&modestbranding=1`}
                title={title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <button
              onClick={() => navigate("/live-bhajans")}
              className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-full font-medium transition"
            >
              🔙 {t("live.back")}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LivePlayer;
