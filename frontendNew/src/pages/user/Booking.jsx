// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { bookPuja } from "../../services/api";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
    pandit: "",
    address: "",
  });

  const [pandits, setPandits] = useState([]);
  const [showCustomService, setShowCustomService] = useState(false);
  const location = useLocation();

  const commonPujas = [
    "Diwali Pooja",
    "Griha Pravesh",
    "Marriage Ceremony",
    "Bhagwat Katha",
    "Satyanarayan Pooja",
    "Office Pooja",
    "Mundan Sanskar",
    "Navgraha Shanti",
    "Shraddha Karma",
    "Rudrabhishek",
    "Annaprashan",
  ];

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scroll to top on load

    const fetchPandits = async () => {
      try {
        const res = await axiosInstance.get("/user/pandits");
        const approved = res.data?.data?.filter(
          (p) => p.status?.toLowerCase() === "approved"
        ) || [];
        setPandits(approved);
      } catch (err) {
        console.error("Failed to fetch pandits:", err);
      }
    };

    fetchPandits();

    const params = new URLSearchParams(location.search);
    const serviceFromQuery = params.get("service");
    const panditFromQuery = params.get("pandit");

    setFormData((prev) => ({
      ...prev,
      service: serviceFromQuery || "",
      pandit: panditFromQuery || "",
    }));

    if (serviceFromQuery && !commonPujas.includes(serviceFromQuery)) {
      setShowCustomService(true);
    }
  }, [location]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleServiceSelect = (e) => {
    const selected = e.target.value;
    if (selected === "Other") {
      setShowCustomService(true);
      setFormData({ ...formData, service: "" });
    } else {
      setShowCustomService(false);
      setFormData({ ...formData, service: selected });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await bookPuja(formData);
      alert("Booking successful: " + res.data.message);
    } catch (err) {
      alert("Failed to book. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-700">Book a Puja</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        {/* Puja Dropdown + Custom Option */}
        <select
          name="service"
          className="w-full p-2 border rounded"
          value={commonPujas.includes(formData.service) ? formData.service : "Other"}
          onChange={handleServiceSelect}
          required
        >
          <option value="">-- Select Puja --</option>
          {commonPujas.map((puja, i) => (
            <option key={i} value={puja}>
              {puja}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>

        {/* Custom Service Input */}
        {showCustomService && (
          <input
            type="text"
            name="service"
            placeholder="Enter custom puja/service"
            required
            className="w-full p-2 border rounded"
            value={formData.service}
            onChange={handleChange}
          />
        )}

        {/* Pandit Dropdown */}
        <select
          name="pandit"
          required
          className="w-full p-2 border rounded"
          value={formData.pandit}
          onChange={handleChange}
        >
          <option value="">-- Select Pandit --</option>
          {pandits.map((p) => (
            <option key={p._id} value={p.name}>
              {p.name} ({p.expertise}) - {p.location}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
  type="text"
  name="address"
  placeholder="Address"
  required
  className="w-full p-2 border rounded"
  onChange={handleChange}
/>


        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
