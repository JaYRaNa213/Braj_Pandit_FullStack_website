// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import axios from "axios";
import fs from "fs";
import path from "path";
import Channel from "../models/Channel.js";

const CACHE_DIR = path.resolve("cache");
const CACHE_FILE = path.join(CACHE_DIR, "liveBhajans.json");

const apiKeys = process.env.YOUTUBE_API_KEY.split(",");

// ✅ Read from cache if available and valid
const getCache = () => {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const content = fs.readFileSync(CACHE_FILE, "utf-8");
    const json = JSON.parse(content);
    const today = new Date().toISOString().slice(0, 10);
    return json?.date === today ? json.data : null;
  } catch (error) {
    console.error("❌ Error reading cache:", error.message);
    return null;
  }
};

// ✅ Save cache to file
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

// ✅ Fetch live or default videos
const fetchLiveVideos = async () => {
  const channels = await Channel.find({});
  const results = [];

  for (const channel of channels) {
    let videoId = channel.defaultVideo;
    let isLive = false;

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
          break; // found live, break key loop
        }
      } catch (err) {
        if (err.response?.status === 403) continue; // API key quota exceeded
        console.error("🔴 YouTube fetch error:", err.message);
        break;
      }
    }

    results.push({
      ...channel._doc,
      videoId,
      isLive,
    });
  }

  return results;
};

// ✅ Route: GET /api/live/home → Top 3 videos
export const getLiveHome = async (req, res) => {
  try {
    const cached = getCache();
    if (cached) {
      return res.status(200).json(cached.slice(0, 3));
    }

    const data = await fetchLiveVideos();
    saveCache(data);
    return res.status(200).json(data.slice(0, 3));
  } catch (err) {
    console.error("❌ getLiveHome failed:", err.message);
    return res.status(500).json({ message: "Fetch failed and no cache available." });
  }
};

// ✅ Route: GET /api/live/all → All videos
export const getLiveAll = async (req, res) => {
  try {
    const cached = getCache();
    if (cached) {
      return res.status(200).json(cached);
    }

    const data = await fetchLiveVideos();
    saveCache(data);
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ getLiveAll failed:", err.message);
    return res.status(500).json({ message: "Fetch failed and no cache available." });
  }
};

// ✅ Route: POST /api/admin/live → Add channels
export const addChannels = async (req, res) => {
  try {
    await Channel.insertMany(req.body);
    res.status(201).json({ message: "Channels added successfully" });
  } catch (err) {
    console.error("❌ addChannels failed:", err.message);
    res.status(500).json({ message: "Failed to add channels", error: err.message });
  }
};

// ✅ Route: GET /api/admin/live → Get all channels
export const getChannels = async (req, res) => {
  try {
    const list = await Channel.find({});
    res.status(200).json(list);
  } catch (err) {
    console.error("❌ getChannels failed:", err.message);
    res.status(500).json({ message: "Failed to get channels" });
  }
};

// ✅ Route: DELETE /api/admin/live/:id → Delete a channel
export const deleteChannel = async (req, res) => {
  try {
    await Channel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (err) {
    console.error("❌ deleteChannel failed:", err.message);
    res.status(500).json({ message: "Failed to delete channel" });
  }
};
