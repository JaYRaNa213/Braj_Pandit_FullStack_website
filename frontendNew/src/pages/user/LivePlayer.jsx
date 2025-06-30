// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LivePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Live Bhajan Stream");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id && id !== "recorded") {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
        .then((res) => res.json())
        .then((data) => setTitle(data.title))
        .catch(() => setTitle("Live Bhajan Stream"));
    }
  }, [id]);

  const isValidId = id !== "recorded";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="max-w-5xl w-full aspect-video relative">
        {isValidId ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            className="w-full h-full rounded-lg shadow-2xl"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={title}
          />
        ) : (
          <div className="bg-white p-8 rounded-xl text-center shadow-xl w-full h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-red-700 mb-4">
              🔕 No Live Bhajan Available
            </h2>
            <p className="text-gray-700 mb-6 max-w-md">
              The selected bhajan is not currently streaming live. Please try again later or explore other live bhajans.
            </p>
            <button
              onClick={() => navigate("/live-bhajans")}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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
