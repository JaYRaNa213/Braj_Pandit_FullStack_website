// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { bookPuja } from "../../services/api";
import { motion } from "framer-motion";
import Loader from "../../components/common/Loader";
import pujaImg from "../../assets/puja-generic.jpg"; // 🔄 Optional image for puja banner

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
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [pujaDescription, setPujaDescription] = useState("");

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

  const pujaInfo = {
    "Diwali Pooja": "Performed to invite prosperity and blessings from Goddess Lakshmi and Lord Ganesha during the festival of lights.",
    "Griha Pravesh": "Conducted before entering a new home to bring positive energy and remove negative influences.",
    "Marriage Ceremony": "Traditional Hindu wedding rituals invoking blessings for a harmonious married life.",
    "Bhagwat Katha": "Spiritual discourse of Lord Krishna’s divine pastimes for peace and devotion.",
    "Satyanarayan Pooja": "A sacred ritual to seek blessings from Lord Vishnu for success and prosperity.",
    "Office Pooja": "Puja for inaugurating a new office or workspace to invoke success and positive energy.",
    "Mundan Sanskar": "Ceremony of a child's first haircut for purification and good health.",
    "Navgraha Shanti": "Done to nullify the negative effects of the nine planets.",
    "Shraddha Karma": "Rituals performed to honor and provide peace to departed ancestors.",
    "Rudrabhishek": "Powerful pooja dedicated to Lord Shiva, offering peace and removal of obstacles.",
    "Annaprashan": "First solid feeding ceremony of a baby with prayers for health and nourishment.",
  };

  useEffect(() => {
    window.scrollTo(0, 0);

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

    if (serviceFromQuery) {
      setPujaDescription(pujaInfo[serviceFromQuery] || "A sacred ceremony to invoke divine blessings and remove obstacles.");
    }

  }, [location]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleServiceSelect = (e) => {
    const selected = e.target.value;
    if (selected === "Other") {
      setShowCustomService(true);
      setFormData({ ...formData, service: "" });
      setPujaDescription("Please specify your custom puja or ceremony.");
    } else {
      setShowCustomService(false);
      setFormData({ ...formData, service: selected });
      setPujaDescription(pujaInfo[selected]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await bookPuja(formData);
      alert("Booking successful: " + res.data.message);
      setFormData({
        name: "",
        email: "",
        service: "",
        date: "",
        time: "",
        pandit: "",
        address: "",
      });
    } catch (err) {
      alert("Failed to book. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 flex items-center justify-center px-4 py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left Side - Puja Description */}
        <div className="p-6 md:p-10 bg-purple-100 border-r border-purple-300 flex flex-col justify-center">
          <img src={pujaImg} alt="Puja Banner" className="rounded-xl mb-6 shadow-lg" />
          <h2 className="text-3xl font-bold text-purple-800 mb-4">
            {formData.service || "Your Puja"}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {pujaDescription}
          </p>
        </div>

        {/* Right Side - Booking Form */}
        <div className="p-6 md:p-10">
          <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
            📿 Book a Puja
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />

            <select
              name="service"
              value={commonPujas.includes(formData.service) ? formData.service : "Other"}
              onChange={handleServiceSelect}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            >
              <option value="">-- Select a Puja Service --</option>
              {commonPujas.map((puja, idx) => (
                <option key={idx} value={puja}>{puja}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {showCustomService && (
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="Enter custom puja/service"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            )}

            <select
              name="pandit"
              value={formData.pandit}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            >
              <option value="">-- Select Pandit --</option>
              {pandits.map((p) => (
                <option key={p._id} value={p.name}>
                  {p.name} ({p.expertise}) - {p.location}
                </option>
              ))}
            </select>

            <div className="flex gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="Full Address for the Puja"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded transition font-semibold tracking-wide"
            >
              {loading ? <Loader small /> : "📿 Confirm Puja Booking"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
