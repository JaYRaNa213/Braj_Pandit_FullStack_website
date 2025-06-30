// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { bookPuja } from "../../services/api";
import { motion } from "framer-motion";
import Loader from "../../components/common/Loader";
const pujaImg = "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/default-puja_fallback.jpg";

import pujaServicesData from "../../data/pujaServices.json";

export default function Booking() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
    pandit: "",
    address: "",
  });

  const [pujaImage, setPujaImage] = useState(pujaImg);
  const [pujaDescription, setPujaDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [pandits, setPandits] = useState([]);
  const [showCustomService, setShowCustomService] = useState(false);

  const commonPujas = pujaServicesData.map((puja) => puja.title);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const serviceFromQuery = decodeURIComponent(params.get("service") || "");
    const panditFromQuery = decodeURIComponent(params.get("pandit") || "");

    setFormData((prev) => ({
      ...prev,
      service: serviceFromQuery,
      pandit: panditFromQuery,
    }));

    if (serviceFromQuery && !commonPujas.includes(serviceFromQuery)) {
      setShowCustomService(true);
    }

    const cleanedService = serviceFromQuery.toLowerCase().trim();
    let matched = pujaServicesData.find(
      (puja) => puja.title.toLowerCase().trim() === cleanedService
    );

    if (!matched) {
      matched = pujaServicesData.find(
        (puja) =>
          cleanedService.includes(puja.title.toLowerCase().trim()) ||
          puja.title.toLowerCase().includes(cleanedService)
      );
    }

    if (matched) {
      setPujaImage(matched.img);
      setPujaDescription(matched.description);
    } else {
      setPujaImage(pujaImg);
      setPujaDescription("A sacred ceremony to invoke divine blessings and remove obstacles.");
    }

    const fetchPandits = async () => {
      try {
        const res = await axiosInstance.get("/user/pandits");
        const approvedPandits =
          res.data?.data?.filter((p) => p.status?.toLowerCase() === "approved") || [];
        setPandits(approvedPandits);
      } catch (err) {
        console.error("Error fetching pandits:", err);
      }
    };

    fetchPandits();
  }, [location]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleServiceSelect = (e) => {
    const selected = e.target.value;

    if (selected === "Other") {
      setShowCustomService(true);
      setFormData({ ...formData, service: "" });
      setPujaDescription("Please specify your custom puja or ceremony.");
      setPujaImage(pujaImg);
    } else {
      setShowCustomService(false);
      setFormData({ ...formData, service: selected });

      const matched = pujaServicesData.find(
        (puja) => puja.title === selected
      );

      setPujaDescription(matched?.description || "A sacred ceremony to invoke divine blessings.");
      setPujaImage(matched?.img || pujaImg);
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
      alert("Booking failed. Please try again.");
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
        {/* Left Side - Puja Details */}
        <div className="p-6 md:p-10 bg-purple-100 border-r border-purple-300 flex flex-col justify-center">
          <img
            src={pujaImage}
            alt="Puja"
            onError={(e) => (e.target.src = pujaImg)}
            className="rounded-xl mb-6 shadow-lg w-full h-64 object-cover"
          />
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
              className="w-full p-3 border border-gray-300 rounded"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />

            <select
              name="service"
              value={commonPujas.includes(formData.service) ? formData.service : "Other"}
              onChange={handleServiceSelect}
              className="w-full p-3 border border-gray-300 rounded"
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
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            )}

            <select
              name="pandit"
              value={formData.pandit}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
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
                className="w-1/2 p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-1/2 p-3 border border-gray-300 rounded"
                required
              />
            </div>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="Full Address for the Puja"
              className="w-full p-3 border border-gray-300 rounded"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded font-semibold tracking-wide"
            >
              {loading ? <Loader small /> : "📿 Confirm Puja Booking"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
