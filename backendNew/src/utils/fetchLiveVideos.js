// // File: backendNew/src/utils/fetchLiveVideos.js
const axios = require("axios");

const apiKeys = [
  "AIzaSyCRmqbUt3mjCJuGvGXvfCoz789qNpMEa0Q",
  "AIzaSyCjU0wbYl_UnHl4EoF7izLW3IDgQrflREE",
  "AIzaSyBVKDBwODBMjdAu-UV0cHPuOJuXrfoFKYs",
];

const channels = [
  {
    id: "UC4R8DWoMoI7CAwX8_LjQHig",
    title: "Radha Raman Ji Live Bhajan",
    defaultVideo: "sq-1yTTP5xM",
    image: "https://...",
    description: "A calming bhajan...",
  },
  // Add more here
];

const fetchLiveVideos = async () => {
  const results = [];

  for (const channel of channels) {
    let success = false;
    let videoId = channel.defaultVideo;

    for (const key of apiKeys) {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              channelId: channel.id,
              eventType: "live",
              type: "video",
              key,
            },
          }
        );

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
      ...channel,
      videoId,
      isLive: success,
    });
  }

  return results;
};

module.exports = fetchLiveVideos;
