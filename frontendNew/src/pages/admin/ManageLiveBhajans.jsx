// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import { useEffect, useState } from "react";
import {
  getAllAdminLiveBhajans,
  addLiveBhajan,
  deleteLiveBhajan,
} from "@/services/admin/liveBhajanService";
import { toast } from "react-toastify";

export default function ManageLiveBhajans() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    channelId: "",
    description: "",
    defaultVideo: "",
    image: "",
  });

  const fetchData = async () => {
    try {
      const res = await getAllAdminLiveBhajans();
      setChannels(res.data);
    } catch {
      toast.error("Failed to fetch channels");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!formData.title || !formData.channelId) {
      return toast.error("Title and Channel ID are required");
    }
    try {
      setLoading(true);
      await addLiveBhajan([formData]);
      toast.success("Channel added successfully!");
      setFormData({
        title: "",
        channelId: "",
        description: "",
        defaultVideo: "",
        image: "",
      });
      fetchData();
    } catch {
      toast.error("Failed to add channel");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this channel?")) return;
    try {
      await deleteLiveBhajan(id);
      toast.success("Channel deleted");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const filtered = channels.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-[#4A1C1C] mb-6">
        🎥 Manage Live Bhajan Channels
      </h1>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {["title", "channelId", "description", "defaultVideo"].map((field) => (
          <input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
        ))}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="col-span-1 md:col-span-2"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="preview"
            className="max-w-xs rounded shadow col-span-1 md:col-span-2"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`col-span-1 md:col-span-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "➕ Add Channel"}
        </button>
      </div>

      {/* Search Bar */}
      <input
        placeholder="Search channels..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full sm:w-1/2 px-4 py-2 border rounded-full shadow focus:outline-none"
      />

      {/* Channel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item._id} className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src={item.image || "https://via.placeholder.com/400x250?text=No+Image"}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-[#4A1C1C]">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs text-gray-500 mt-1">Channel ID: {item.channelId}</p>
              {item.defaultVideo && (
                <iframe
                  src={`https://www.youtube.com/embed/${item.defaultVideo}`}
                  className="w-full mt-2 rounded"
                  allowFullScreen
                  title={item.title}
                />
              )}
              <div className="mt-3">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
