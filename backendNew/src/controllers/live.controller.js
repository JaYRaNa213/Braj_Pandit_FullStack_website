import axios from "axios";
import fs from "fs";
import path from "path";

const CACHE_PATH = path.join("cache", "liveBhajans.json");

export const getLiveVideos = async (req, res) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const channelIds = process.env.CHANNEL_IDS?.split(",");
  const today = new Date().toISOString().slice(0, 10);

  // Ensure cache directory exists
  if (!fs.existsSync("cache")) fs.mkdirSync("cache");

  // Load existing cache
  let cached = null;
  if (fs.existsSync(CACHE_PATH)) {
    cached = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
    if (cached.date === today) {
      return res.status(200).json(cached.data);
    }
  }

  // If it's a new day, try to refresh
  try {
    const results = [];

    for (const channelId of channelIds) {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          channelId,
          eventType: "live",
          type: "video",
          key: API_KEY,
        },
      });

      const liveData = response.data.items;
      if (liveData.length > 0) {
        results.push(...liveData.map(item => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.medium.url,
          isLive: true
        })));
      }
    }

    // Fill placeholders
    while (results.length < 3) {
      results.push({
        videoId: null,
        title: "Waiting for Live Bhajan",
        description: "Stay tuned for upcoming bhajans.",
        channelTitle: "Vrinda Channel",
        thumbnail: "/images/https://res.cloudinary.com/djtq2eywl/image/upload/v1750917551/IMG20250620125049_gkug9w.jpg",
        isLive: false
      });
    }

    // Save cache to file
    const payload = {
      date: today,
      data: results.slice(0, 3),
    };

    fs.writeFileSync(CACHE_PATH, JSON.stringify(payload, null, 2));
    return res.status(200).json(payload.data);

  } catch (error) {
    console.error("❌ YouTube fetch failed:", error.message);

    // Fallback to last cache
    if (cached?.data) {
      return res.status(200).json(cached.data);
    }

    return res.status(500).json({ message: "Failed to fetch and no cache available." });
  }
};
