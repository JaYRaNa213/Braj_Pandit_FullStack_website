// models/pandit.model.js
import mongoose from "mongoose";

const panditSchema = new mongoose.Schema(
  {
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
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pandit", panditSchema);
