// File: src/utils/fetchLiveVideos.js
import axios from "axios";
import BhajanChannel from "../models/BhajanChannel.js";

const apiKeys = [
  "AIzaSyCRmqbUt3mjCJuGvGXvfCoz789qNpMEa0Q",
  "AIzaSyCjU0wbYl_UnHl4EoF7izLW3IDgQrflREE",
  "AIzaSyBVKDBwODBMjdAu-UV0cHPuOJuXrfoFKYs",
];

export const fetchLiveVideos = async () => {
  const channels = await BhajanChannel.find();
  console.log(`📡 Fetched ${channels.length} channels from DB`);

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
        console.warn(`❌ Error for ${channel.title}:`, err?.response?.status || err.message);
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
