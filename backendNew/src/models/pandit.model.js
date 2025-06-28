// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import mongoose from "mongoose";

const panditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bio: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // optional if needed for tracking
  },
}, { timestamps: true });

export default mongoose.model("Pandit", panditSchema);

