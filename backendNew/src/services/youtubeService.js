// 🔐 Developed by Jay Rana © 2025 — Not for reuse

import axios from "axios";
import BhajanChannel from "../models/BhajanChannel.js";

const YT_KEYS = process.env.YOUTUBE_API_KEY?.split(",") || [];

// ✅ Check if a YouTube channel is live right now
export async function checkChannelLiveStatus(channelId) {
  for (const key of YT_KEYS) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${key}`;
      const res = await axios.get(url);
      if (res.data.items.length > 0) return res.data.items[0]; // Live found
    } catch (err) {
      if (err.response?.status === 403) continue; // Try next key if quota exceeded
      console.error("🔴 YouTube API error:", err.message);
      break;
    }
  }
  return null;
}

// ✅ Get all bhajan channels from DB
export async function getAllBhajansFromDB() {
  return BhajanChannel.find(); // returns all channels
}

// ✅ Enrich each channel with live status & videoId
export async function getLiveBhajansEnriched() {
  const allBhajans = await getAllBhajansFromDB();

  const enriched = await Promise.all(
    allBhajans.map(async (item) => {
      const liveData = await checkChannelLiveStatus(item.channelId);
      return {
        ...item.toObject(),
        videoId: liveData?.id?.videoId || item.defaultVideo,
        isLive: !!liveData,
      };
    })
  );

  return enriched;
}
