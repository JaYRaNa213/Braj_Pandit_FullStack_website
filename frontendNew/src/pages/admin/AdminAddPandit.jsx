// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/admin/AdminAddPandit.jsx
import React, { useState } from "react";
import { addPandit } from "../../services/admin/panditService";
import { toast } from "react-toastify";

const AdminAddPandit = () => {
  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    experience: "",
    location: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPandit(formData);
      toast.success("Pandit added successfully");
      setFormData({
        name: "",
        expertise: "",
        experience: "",
        location: "",
        imageUrl: "",
      });
    } catch (err) {
      toast.error("Error adding pandit");
      console.error(err);
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
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          placeholder="Image URL"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-[#4A1C1C] text-white px-6 py-2 rounded hover:bg-[#6a2b2b]"
        >
          Add Pandit
        </button>
      </form>
    </div>
  );
};

export default AdminAddPandit;
