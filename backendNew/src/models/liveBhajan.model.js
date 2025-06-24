import mongoose from "mongoose";

const liveBhajanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: { type: String, required: true },
  status: { type: String, enum: ["live", "upcoming", "offline"], default: "live" },
  videoUrl: String, // optional livestream/video
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("LiveBhajan", liveBhajanSchema);
