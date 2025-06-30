// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LivePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Live Bhajan Stream");
  const [loadingTitle, setLoadingTitle] = useState(true);

  const isValidId = id !== "recorded";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isValidId) {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
        .then((res) => res.json())
        .then((data) => setTitle(data.title))
        .catch(() => setTitle("Live Bhajan Stream"))
        .finally(() => setLoadingTitle(false));
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black dark:from-gray-950 dark:to-black flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full aspect-video relative">
        {isValidId ? (
          <div className="flex flex-col items-center gap-4">
            {!loadingTitle && (
              <h1 className="text-xl md:text-2xl text-white text-center font-semibold mb-4">
                🎵 {title}
              </h1>
            )}
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
              className="w-full h-full rounded-xl shadow-2xl border-4 border-white dark:border-gray-700"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={title}
            />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 text-center p-8 rounded-xl shadow-xl w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">
              🔕 No Live Bhajan Available
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md">
              The selected bhajan is not currently streaming. Please check back later or explore other live bhajans.
            </p>
            <button
              onClick={() => navigate("/live-bhajans")}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition"
            >
              🔙 Back to Bhajans
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePlayer;
