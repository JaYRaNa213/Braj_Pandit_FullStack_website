import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiKeys = [
  "AIzaSyCRmqbUt3mjCJuGvGXvfCoz789qNpMEa0Q",
];

const fixedBhajans = [
  {
    id: "UC4R8DWoMoI7CAwX8_LjQHig",
    title: "Shree Ram Jai Ram Jai Jai Ram",
    description: "A calming bhajan invoking the divine name of Lord Ram.",
    image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750851970/radha-raman-ji-murthi_gzfglc.jpg",
    defaultVideo: "sq-1yTTP5xM", // Do not embed unless live
  },
  {
    id: "UChWrtLawgh2gkx5b5xqk6Jg",
    title: "Om Namah Shivaya - Rudra Abhishek",
    description: "Powerful Shiva chanting with rudra abhishek.",
    image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852044/Premanand-Ji-Maharaj_yb93dt.jpg",
    defaultVideo: "4y1LZQsyuSQ",
  },
  {
    id: "UCME1pkoBbdph5FbvJH8YZ2w",
    title: "Hare Krishna Mahamantra - ISKCON Kirtan",
    description: "Live kirtan from ISKCON temple chanting the maha-mantra.",
    image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852055/anirudh_rxh0fi.jpg",
    defaultVideo: "8IhzG0_4zMw",
  },
];

const fetchWithKeyRotation = async (channelId) => {
  for (let key of apiKeys) {
    try {
      const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          channelId,
          eventType: "live",
          type: "video",
          key,
        },
      });
      if (res.data.items.length > 0) {
        return {
          success: true,
          videoId: res.data.items[0].id.videoId,
        };
      }
    } catch (err) {
      if (err.response?.status === 403) {
        console.warn("⚠️ API quota exceeded for key:", key);
        continue;
      }
    }
  }
  return { success: false, error: "All keys exhausted or invalid" };
};

const LiveBhajan = () => {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const results = [];

      for (const bhajan of fixedBhajans) {
        const res = await fetchWithKeyRotation(bhajan.id);
        if (res.success) {
          results.push({
            ...bhajan,
            isLive: true,
            videoId: res.videoId,
          });
        } else {
          results.push({
            ...bhajan,
            isLive: false,
            videoId: "recorded",
          });
        }

        if (res.error) setQuotaExceeded(true);
      }

      setBhajans(results);
      setLoading(false);
    };

    fetchAll();
    const interval = setInterval(fetchAll, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-red-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-12">
          Live Bhajan & Kirtan
        </h2>

        {loading ? (
          <p className="text-lg text-gray-600">Loading bhajans...</p>
        ) : quotaExceeded ? (
          <p className="text-yellow-600 mb-4 font-medium">
            ⚠️ YouTube API limit reached. Showing recorded cards only.
          </p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bhajans.map((item, i) => (
            <Link
              key={i}
              to={`/live/${item.videoId}`}
              className="block group transition-transform hover:scale-[1.01]"
            >
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition overflow-hidden border border-gray-200 flex flex-col h-full">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover"
                  />

                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 shadow ${
                      item.isLive
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <span className="text-xs">{item.isLive ? "🔴" : "⏳"}</span>
                    {item.isLive ? "LIVE" : "Not Live"}
                  </div>
                </div>

                <div className="p-5 text-left flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-[#4A1C1C] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {item.description?.slice(0, 100)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveBhajan;
