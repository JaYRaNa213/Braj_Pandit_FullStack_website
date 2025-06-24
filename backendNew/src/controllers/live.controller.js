// import axios from "axios";

// export const getLiveVideos = async (req, res) => {
//   const API_KEY = process.env.YOUTUBE_API_KEY;
//   const channelIds = process.env.CHANNEL_IDS.split(",");

//   try {
//     const results = [];

//     for (const channelId of channelIds) {
//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/search`, {
//         params: {
//           part: "snippet",
//           channelId,
//           eventType: "live",
//           type: "video",
//           key: API_KEY
//         }
//       });

//       const liveData = response.data.items;
//       if (liveData.length > 0) {
//         results.push(...liveData.map(item => ({
//           videoId: item.id.videoId,
//           title: item.snippet.title,
//           description: item.snippet.description,
//           channelTitle: item.snippet.channelTitle,
//           publishedAt: item.snippet.publishedAt,
//           thumbnail: item.snippet.thumbnails.medium.url
//         })));
//       }
//     }

//     res.status(200).json(results);
//   } catch (error) {
//     console.error("Live fetch error:", error.message);
//     res.status(500).json({ message: "Failed to fetch live bhajan data" });
//   }
// };



import axios from "axios";
// import axios from "axios";

export const getLiveVideos = async (req, res) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const channelIds = process.env.CHANNEL_IDS?.split(",");

  if (!API_KEY || !channelIds) {
    console.error("❌ Missing API_KEY or CHANNEL_IDS");
    return res.status(500).json({ message: "Missing API config" });
  }

  try {
    const results = [];

    for (const channelId of channelIds) {
      console.log(`📺 Checking channel: ${channelId}`);
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
        results.push(
          ...liveData.map((item) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails.medium.url,
          }))
        );
      }
    }

    console.log(`✅ Found ${results.length} live videos`);
    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Live fetch error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch live bhajan data" });
  }
};
