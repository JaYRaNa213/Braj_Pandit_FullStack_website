// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import axios from "axios";
import fs from "fs";
import path from "path";
import BhajanChannel from "../models/BhajanChannel.js";

// 📁 Local cache file to prevent excessive YouTube API hits
const CACHE_DIR = path.resolve("cache");
const CACHE_FILE = path.join(CACHE_DIR, "liveBhajans.json");

// 🔑 Support multiple API keys to rotate through quota limits
const apiKeys = process.env.YOUTUBE_API_KEY?.split(",") || [];

// ✅ Read cache if available and valid
const getCache = () => {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const content = fs.readFileSync(CACHE_FILE, "utf-8");
    const json = JSON.parse(content);
    const today = new Date().toISOString().slice(0, 10);
    return json?.date === today && Array.isArray(json.data) && json.data.length > 0
      ? json.data
      : null;
  } catch (error) {
    console.error("❌ Error reading cache:", error.message);
    return null;
  }
};

// ✅ Save data to cache
const saveCache = (data) => {
  try {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    const payload = {
      date: new Date().toISOString().slice(0, 10),
      data,
    };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(payload, null, 2));
  } catch (error) {
    console.error("❌ Error saving cache:", error.message);
  }
};

// ✅ Fetch latest video (live or fallback) from YouTube
const fetchLiveVideos = async () => {
  const channels = await BhajanChannel.find({});
  const results = [];

  if (channels.length === 0) {
    console.warn("⚠️ No bhajan channels found in DB");
    return results;
  }

  if (apiKeys.length === 0) {
    console.warn("⚠️ No YouTube API keys configured. Using default videos only.");
  }

  for (const channel of channels) {
    let videoId = channel.defaultVideo || null;
    let isLive = false;

    if (apiKeys.length > 0) {
      for (const key of apiKeys) {
        try {
          const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
              part: "snippet",
              channelId: channel.channelId,
              eventType: "live",
              type: "video",
              key,
            },
          });

          if (res.data.items?.length > 0) {
            videoId = res.data.items[0].id.videoId;
            isLive = true;
            break;
          }
        } catch (err) {
          if (err.response?.status === 403) {
            console.warn(`⚠️ API key quota exceeded: ${key}`);
            continue; // Try next key
          }
          console.error(`🔴 YouTube fetch error for ${channel.title}:`, err.message);
          break; // Other errors - break and fallback to default
        }
      }
    }

    if (videoId) {
      results.push({
        ...channel._doc,
        videoId,
        isLive,
      });
    }
  }

  console.log(`✅ Total enriched channels: ${results.length}`);
  return results;
};

// ✅ GET /api/live/home → Return all live/fallback videos (sorted by live status)
export const getLiveHome = async (req, res) => {
  try {
    const cached = getCache();
    const limit = parseInt(req.query.limit) || null;

    if (cached && cached.length > 0) {
      const sorted = [...cached].sort((a, b) => Number(b.isLive) - Number(a.isLive));
      return res.status(200).json(limit ? sorted.slice(0, limit) : sorted);
    }

    const data = await fetchLiveVideos();
    if (data.length === 0) {
      return res.status(200).json([]);
    }

    saveCache(data);
    const sorted = [...data].sort((a, b) => Number(b.isLive) - Number(a.isLive));
    return res.status(200).json(limit ? sorted.slice(0, limit) : sorted);
  } catch (err) {
    console.error("❌ getLiveHome failed:", err.message);
    return res.status(500).json({ message: "Fetch failed and no cache available." });
  }
};

// ✅ GET /api/live/all → Return all enriched bhajan channels
export const getLiveAll = async (req, res) => {
  try {
    const cached = getCache();

    if (cached && cached.length > 0) {
      return res.status(200).json(cached);
    }

    const data = await fetchLiveVideos();
    if (data.length === 0) {
      return res.status(200).json([]); // Return empty array if nothing found
    }

    saveCache(data);
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ getLiveAll failed:", err.message);
    return res.status(500).json({ message: "Fetch failed and no cache available." });
  }
};

// ✅ POST /api/admin/live → Add multiple bhajan channels
export const addChannels = async (req, res) => {
  try {
    const body = req.body;
    if (!Array.isArray(body)) {
      return res.status(400).json({ message: "Payload must be an array of channels." });
    }

    await BhajanChannel.insertMany(body);
    res.status(201).json({ message: "Channels added successfully." });
  } catch (err) {
    console.error("❌ addChannels failed:", err.message);
    res.status(500).json({ message: "Failed to add channels", error: err.message });
  }
};

// ✅ GET /api/admin/live → Return all stored bhajan channels
export const getChannels = async (req, res) => {
  try {
    const list = await BhajanChannel.find({});
    res.status(200).json(list);
  } catch (err) {
    console.error("❌ getChannels failed:", err.message);
    res.status(500).json({ message: "Failed to get channels" });
  }
};

// ✅ DELETE /api/admin/live/:id → Delete channel by ID
export const deleteChannel = async (req, res) => {
  try {
    await BhajanChannel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (err) {
    console.error("❌ deleteChannel failed:", err.message);
    res.status(500).json({ message: "Failed to delete channel" });
  }
};
