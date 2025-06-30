
// =====================================
// 2. controllers/liveController.js
// =====================================
import axios from "axios";
import fs from "fs";
import path from "path";
import Channel from "../models/Channel.js";

const CACHE_DIR = path.join("cache");
const CACHE_FILE = path.join(CACHE_DIR, "liveBhajans.json");
const apiKeys = [
  process.env.YT_KEY1,
  process.env.YT_KEY2,
  process.env.YT_KEY3
];

const getCache = () => {
  if (!fs.existsSync(CACHE_FILE)) return null;
  try {
    const json = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    return json?.date === new Date().toISOString().slice(0, 10) ? json.data : null;
  } catch {
    return null;
  }
};

const saveCache = (data) => {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR);
  const payload = {
    date: new Date().toISOString().slice(0, 10),
    data,
  };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(payload, null, 2));
};

const fetchLiveVideos = async () => {
  const channels = await Channel.find({});
  const results = [];

  for (const channel of channels) {
    let success = false;
    let videoId = channel.defaultVideo;

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

        if (res.data.items.length > 0) {
          videoId = res.data.items[0].id.videoId;
          success = true;
          break;
        }
      } catch (err) {
        if (err.response?.status === 403) continue;
        break;
      }
    }

    results.push({
      ...channel._doc,
      videoId,
      isLive: success,
    });
  }

  return results;
};

export const getLiveHome = async (req, res) => {
  const cached = getCache();
  if (cached) return res.status(200).json(cached.slice(0, 3));

  try {
    const data = await fetchLiveVideos();
    saveCache(data);
    return res.status(200).json(data.slice(0, 3));
  } catch (err) {
    console.error("❌ Fetch failed:", err.message);
    return res.status(500).json({ message: "Fetch failed and no cache available." });
  }
};

export const getLiveAll = async (req, res) => {
  const cached = getCache();
  if (cached) return res.status(200).json(cached);

  try {
    const data = await fetchLiveVideos();
    saveCache(data);
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Fetch failed:", err.message);
    return res.status(500).json({ message: "Fetch failed and no cache available." });
  }
};

export const addChannels = async (req, res) => {
  try {
    await Channel.insertMany(req.body);
    res.status(201).json({ message: "Channels added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getChannels = async (req, res) => {
  const list = await Channel.find({});
  res.json(list);
};

export const deleteChannel = async (req, res) => {
  await Channel.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

