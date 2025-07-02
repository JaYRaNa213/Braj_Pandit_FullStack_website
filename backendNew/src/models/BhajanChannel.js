//BhajanChannel.js
import mongoose from "mongoose";

// models/BhajanChannel.js
const bhajanChannelSchema = new mongoose.Schema({
  channelId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  defaultVideo: String,
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("BhajanChannel", bhajanChannelSchema);
