import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { applyAsPandit, getApprovedPandits } from "../../services/user/panditService";

const BePanditForm = () => {
  const { t } = useTranslation();
  const listRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    experience: "",
    location: "",
    email: "",
    imageFile: null,
  });
  const [preview, setPreview] = useState("");
  const [approvedPandits, setApprovedPandits] = useState([]);
  const [filters, setFilters] = useState({ location: "", expertise: "" });
  const [modalData, setModalData] = useState(null);
  const [showAll, setShowAll] = useState(false);

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
      toast.error(t("BePanditForm.upload_error"));
      return;
    }

    try {
      const cloudName = "dzg1bmddg";
      const uploadPreset = "pandit_upload";
      const uploadData = new FormData();
      uploadData.append("file", formData.imageFile);
      uploadData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();

      const payload = { ...formData, imageUrl: data.secure_url };
      delete payload.imageFile;

      await applyAsPandit(payload);
      toast.success(t("BePanditForm.success"));

      setFormData({ name: "", expertise: "", experience: "", location: "", email: "", imageFile: null });
      setPreview("");
      fetchApprovedPandits();

      setTimeout(() => {
        listRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      console.error(err);
      toast.error(t("BePanditForm.error"));
    }
  };

  const fetchApprovedPandits = async () => {
    try {
      const res = await getApprovedPandits();
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setApprovedPandits(res.data.data);
      } else {
        setApprovedPandits([]);
      }
    } catch (err) {
      console.error(err);
      toast.error(t("BePanditForm.load_error"));
    }
  };

  useEffect(() => {
    fetchApprovedPandits();
  }, []);

  const filteredPandits = approvedPandits.filter((p) => {
    return (
      (!filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.expertise || p.expertise.toLowerCase().includes(filters.expertise.toLowerCase()))
    );
  });

  const displayPandits = showAll ? filteredPandits : filteredPandits.slice(0, 16);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#4A1C1C]">
        {t("BePanditForm.heading")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        {["name", "expertise", "experience", "location", "email"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            value={formData[field]}
            placeholder={t(`BePanditForm.${field}`)}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#4A1C1C]"
          />
        ))}

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
            <img src={preview} alt="Preview" className="w-full max-h-64 object-contain mt-3 rounded shadow" />
          )}
        </div>

        <button type="submit" className="bg-[#4A1C1C] text-white px-6 py-2 rounded hover:bg-[#6a2b2b] w-full">
          {t("BePanditForm.submit")}
        </button>
      </form>

      {/* Approved Pandits */}
      <div className="mt-12" ref={listRef}>
        <h3 className="text-2xl font-semibold mb-4 text-[#4A1C1C]">
          {t("BePanditForm.approved_heading")}
        </h3>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="border px-4 py-2 rounded w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Filter by expertise"
            value={filters.expertise}
            onChange={(e) => setFilters({ ...filters, expertise: e.target.value })}
            className="border px-4 py-2 rounded w-full sm:w-auto"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {displayPandits.map((pandit) => (
            <div
              key={pandit._id}
              onClick={() => setModalData(pandit)}
              className="cursor-pointer bg-white p-2 rounded-xl shadow border hover:shadow-lg transition text-center"
            >
              <img
                src={pandit.imageUrl}
                alt={pandit.name}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <h4 className="text-sm font-bold text-[#4A1C1C]">{pandit.name}</h4>
              <p className="text-xs text-gray-700">{pandit.expertise}</p>
            </div>
          ))}
        </div>

        {filteredPandits.length > 16 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#4A1C1C] border border-[#4A1C1C] px-4 py-2 rounded hover:bg-[#4A1C1C] hover:text-white transition"
            >
              {showAll ? t("BePanditForm.view_less") : t("BePanditForm.view_all")}
            </button>
          </div>
        )}

        {/* Modal */}
        {modalData && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
              <button
                onClick={() => setModalData(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              <img src={modalData.imageUrl} alt={modalData.name} className="w-full h-56 object-cover rounded mb-3" />
              <h4 className="text-xl font-bold text-[#4A1C1C]">{modalData.name}</h4>
              <p>{modalData.expertise}</p>
              <p>{modalData.experience}</p>
              <p className="text-sm text-gray-600">{modalData.location}</p>
              <p className="text-sm text-gray-600 mt-2">{modalData.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BePanditForm;