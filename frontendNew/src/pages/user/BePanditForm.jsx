// src/components/pandit/BePanditForm.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { applyAsPandit } from "../../services/user/panditService";
import { useTranslation } from "react-i18next";

const BePanditForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    experience: "",
    location: "",
    email: "",
    imageFile: null,
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageFile) {
      toast.error("❌ Please upload a profile image.");
      return;
    }

    try {
      const cloudName = "dzg1bmddg";
      const uploadPreset = "pandit_upload";

      const formDataUpload = new FormData();
      formDataUpload.append("file", formData.imageFile);
      formDataUpload.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      const data = await res.json();

      const payload = {
        ...formData,
        imageUrl: data.secure_url,
      };
      delete payload.imageFile;

      await applyAsPandit(payload);
      toast.success(t("BePanditForm.success"));

      // Reset form
      setFormData({
        name: "",
        expertise: "",
        experience: "",
        location: "",
        email: "",
        imageFile: null,
      });
      setPreview("");
    } catch (err) {
      console.error(err);
      toast.error(t("BePanditForm.error"));
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#4A1C1C]">
        {t("BePanditForm.heading")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder={t("BePanditForm.name")}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="expertise"
          value={formData.expertise}
          placeholder={t("BePanditForm.expertise")}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="experience"
          value={formData.experience}
          placeholder={t("BePanditForm.experience")}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          placeholder={t("BePanditForm.location")}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder={t("BePanditForm.email")}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("BePanditForm.upload_image")}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-64 object-contain mt-3 rounded shadow"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-[#4A1C1C] text-white px-6 py-2 rounded hover:bg-[#6a2b2b] w-full"
        >
          {t("BePanditForm.submit")}
        </button>
      </form>
    </div>
  );
};

export default BePanditForm;
