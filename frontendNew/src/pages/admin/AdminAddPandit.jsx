// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React, { useState } from "react";
import { addPandit } from "../../services/admin/panditService";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";

const AdminAddPandit = () => {
  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    experience: "",
    location: "",
    imageUrl: "",
  });

  const [uploadType, setUploadType] = useState("file"); // 'file' or 'url'
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, imageUrl: "" })); // clear imageUrl
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, imageUrl: url }));
    setImageFile(null); // clear file input
    setPreview(url);
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudName = "your-cloud-name";
    const uploadPreset = "your-upload-preset";

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalImageUrl = formData.imageUrl;

    try {
      setUploading(true);

      // Upload to cloudinary if file selected
      if (uploadType === "file" && imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      }

      const payload = {
        ...formData,
        imageUrl: finalImageUrl,
      };

      await addPandit(payload);
      toast.success("✅ Pandit added successfully!");

      setFormData({
        name: "",
        expertise: "",
        experience: "",
        location: "",
        imageUrl: "",
      });
      setImageFile(null);
      setPreview(null);
    } catch (err) {
      toast.error("❌ Error adding pandit");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-[#4A1C1C] mb-6">Add New Pandit</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Pandit Name"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="expertise"
          value={formData.expertise}
          placeholder="Expertise (e.g. Vedic Astrology)"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="experience"
          value={formData.experience}
          placeholder="Experience (e.g. 35+ years)"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          placeholder="Location"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        {/* Toggle: Upload Type */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="uploadType"
              value="file"
              checked={uploadType === "file"}
              onChange={() => setUploadType("file")}
            />
            Upload from Device
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="uploadType"
              value="url"
              checked={uploadType === "url"}
              onChange={() => setUploadType("url")}
            />
            Use Image URL
          </label>
        </div>

        {/* Conditional Inputs */}
        {uploadType === "file" ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-4 py-2 rounded"
          />
        ) : (
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleUrlChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        )}

        {preview && (
          <div>
            <p className="text-sm text-gray-500">Image Preview:</p>
            <img
              src={preview}
              alt="Pandit Preview"
              className="w-full max-h-64 object-contain rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-[#4A1C1C] text-white px-6 py-2 rounded hover:bg-[#6a2b2b] w-full"
          disabled={uploading}
        >
          {uploading ? "Adding..." : "Add Pandit"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddPandit;
