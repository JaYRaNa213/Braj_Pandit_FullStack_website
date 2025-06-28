// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../services/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";

const BookingForm = () => {
  const { user } = useContext(AuthContext);
  const [selectedService, setSelectedService] = useState("");
  const [customService, setCustomService] = useState("");
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormValues({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setSelectedService(value);
    if (value !== "Other") setCustomService("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      ...formValues,
      service: selectedService === "Other" ? customService : selectedService,
      message: e.target.message.value,
    };

    try {
      await axiosInstance.post("/user/callBookings", formData);
      toast.success("📨 Booking sent successfully. We'll contact you shortly.");
      setFormValues({ name: "", email: "", phone: "" });
      e.target.reset();
      setSelectedService("");
      setCustomService("");
    } catch (error) {
      toast.error("❌ Failed to send booking. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto mt-16 mb-24 flex flex-col md:flex-row overflow-hidden rounded-3xl shadow-2xl"
    >
      {/* Left Info Section */}
      <div
        className="md:w-1/2 p-8 text-white flex flex-col justify-between"
        style={{ backgroundColor: "#4A1C1C" }}
      >
        <div>
          <h2 className="text-3xl font-bold mb-4 leading-snug">
            ✨ राधे राधे 🙏 <br />
            Get Help in Mathura-Vrindavan
          </h2>
          <p className="text-white/90 text-sm mb-3 leading-relaxed">
            Planning a visit? Need help with travel, darshan, hotel or local seva?
            Fill this form to get connected with our support team instantly!
          </p>
          <ul className="mt-4 text-sm list-disc list-inside text-white/80 space-y-1">
            <li>Room/Hotel Booking Assistance</li>
            <li>VIP Darshan (Banke Bihari Ji, etc.)</li>
            <li>Transportation & Local Vehicles</li>
            <li>Food, Meal or Bhoj Seva</li>
            <li>Guided Tours & Parikrama</li>
          </ul>
          <p className="mt-4 italic text-yellow-100 text-xs">
            📞 We respond quickly via call or WhatsApp
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href="tel:+918888888888"
            className="bg-white text-[#4A1C1C] font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-100 transition text-sm"
          >
            📞 Call Us
          </a>
          <a
            href="https://wa.me/+916395857663?text=Namaste!%20I%20need%20help%20regarding%20travel%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-600 transition text-sm"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>

      {/* Right Form Section */}
      <form
        className="md:w-1/2 p-8 bg-white border-l border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-[#8B0000] mb-6 text-center">
          Request a Call for Local Services
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* PHONE */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formValues.phone}
            onChange={handleChange}
            placeholder="Your active phone number"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* SERVICE TYPE */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            Type of Service *
          </label>
          <select
            name="service"
            required
            value={selectedService}
            onChange={handleServiceChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">-- Please choose an option --</option>
            <option value="Room/Hotel Booking Help">Room/Hotel Booking Help</option>
            <option value="VIP Darshan">VIP Banke Bihari Ji Darshan</option>
            <option value="Need a Vehicle">Need a Vehicle</option>
            <option value="Vrindavan Tour Guide">Vrindavan Tour Guide</option>
            <option value="Food Seva">Food Seva</option>
            <option value="Hotel Seva">Hotel Seva</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* CUSTOM SERVICE */}
        {selectedService === "Other" && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-red-700 mb-1">
              Please Specify Your Service *
            </label>
            <input
              type="text"
              name="customService"
              required
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              placeholder="Describe your requirement"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        )}

        {/* MESSAGE */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            Your Message
          </label>
          <textarea
            name="message"
            rows="4"
            placeholder="Any additional instructions or details..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          ></textarea>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#8B0000] text-white rounded-lg font-semibold hover:bg-red-800 transition-all duration-300 flex items-center justify-center text-lg tracking-wide shadow-lg hover:scale-105"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Submitting..." : "SUBMIT NOW"}
        </button>
      </form>
    </motion.section>
  );
};

export default BookingForm;
