// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/AddLiveVideo.jsx
import React, { useState } from "react";
import axiosInstance from "../services/axios";

const AddLiveVideo = () => {
  const [videoLink, setVideoLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/videos", { link: videoLink });
      alert("Live video added successfully");
      setVideoLink(""); // clear input
    } catch (err) {
      console.error("Error adding video:", err);
      alert("Failed to add live video");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Live Video Link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        className="w-full border rounded p-2"
        required
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
      >
        Add Video Link
      </button>
    </form>
  );
};

export default AddLiveVideo;
