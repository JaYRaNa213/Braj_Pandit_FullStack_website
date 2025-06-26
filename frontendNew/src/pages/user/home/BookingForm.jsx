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
      transition={{ duration: 0.7 }}
      className="relative w-full max-w-3xl mx-auto mt-16 mb-24 p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-red-200 shadow-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #fff6f6, #ffecec, #fffafa)",
      }}
    >
      <h2 className="text-4xl font-bold text-center mb-8 text-red-700">
        Other Travel, Food & Stay Services
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-semibold text-red-600 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-900"
          />
        </div>

        {/* EMAIL */}
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-semibold text-red-600 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-900"
          />
        </div>

        {/* PHONE */}
        <div className="relative">
          <label htmlFor="phone" className="block text-sm font-semibold text-red-600 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formValues.phone}
            onChange={handleChange}
            placeholder="Your active phone number"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-900"
          />
        </div>

        {/* SERVICE TYPE */}
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-red-600 mb-1">
            Type of Service *
          </label>
          <select
            id="service"
            name="service"
            required
            value={selectedService}
            onChange={handleServiceChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-800"
          >
            <option value="">-- Please choose an option --</option>
            <option value="Room/Hotel Booking Help">Room/Hotel Booking Help</option>
            <option value="VIP Banke Bihari Ji Darshan">VIP Banke Bihari Ji Darshan</option>
            <option value="Need a Vehicle">Need a Vehicle</option>
            <option value="Vrindavan Tour Guide">Vrindavan Tour Guide</option>
            <option value="Food Seva">Food Seva</option>
            <option value="Hotel Seva">Hotel Seva</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* CUSTOM SERVICE IF OTHER */}
        {selectedService === "Other" && (
          <div>
            <label htmlFor="customService" className="block text-sm font-semibold text-red-600 mb-1">
              Please Specify Your Service *
            </label>
            <input
              type="text"
              name="customService"
              required
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              placeholder="Describe your requirement"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-800"
            />
          </div>
        )}

        {/* MESSAGE */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-red-600 mb-1">
            Your Message
          </label>
          <textarea
            name="message"
            rows="4"
            placeholder="Any additional instructions or details..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-800"
          ></textarea>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center text-lg tracking-wide shadow-md hover:scale-105"
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
