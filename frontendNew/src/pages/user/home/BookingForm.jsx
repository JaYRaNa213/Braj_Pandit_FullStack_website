// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../services/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";

const BookingForm = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  const [selectedService, setSelectedService] = useState("");
  const [customService, setCustomService] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    setShowSuccess(false);

    const formData = {
      ...formValues,
      service: selectedService === "Other" ? customService : selectedService,
      message: e.target.message.value,
    };

    try {
      await axiosInstance.post("/user/callBookings", formData);
      toast.success(t("booking.success"));
      setFormValues({ name: "", email: "", phone: "" });
      e.target.reset();
      setSelectedService("");
      setCustomService("");
      setShowSuccess(true);
    } catch (error) {
      toast.error(t("booking.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto mt-16 mb-24 flex flex-col md:flex-row overflow-hidden rounded-3xl shadow-2xl border-2 border-yellow-300 dark:border-orange-400"
    >
      {/* Left Info Section */}
      <div
        className="md:w-1/2 p-8 text-white flex flex-col justify-between"
        style={{ backgroundColor: "#4A1C1C" }}
      >
        <div>
          <h2 className="text-3xl font-bold mb-4 leading-snug">
            ✨ {t("booking.title")}
          </h2>
          <p className="text-white/90 text-sm mb-3 leading-relaxed">
            {t("booking.description")}
          </p>
          <ul className="mt-4 text-sm list-disc list-inside text-white/80 space-y-1">
            <li>{t("booking.service1")}</li>
            <li>{t("booking.service2")}</li>
            <li>{t("booking.service3")}</li>
            <li>{t("booking.service4")}</li>
            <li>{t("booking.service5")}</li>
          </ul>
          <p className="mt-4 italic text-yellow-100 text-xs">
            {t("booking.note")}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href="tel:+918888888888"
            className="bg-white text-[#4A1C1C] font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-100 transition text-sm"
          >
            📞 {t("booking.call")}
          </a>
          <a
            href="https://wa.me/+916395857663?text=Namaste!%20I%20need%20help%20regarding%20travel%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-600 transition text-sm"
          >
            💬 {t("booking.whatsapp")}
          </a>
        </div>
      </div>

      {/* Right Form Section */}
      <form
        className="md:w-1/2 p-8 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-[#8B0000] dark:text-yellow-300 mb-6 text-center">
          {t("booking.form_title")}
        </h2>

        {/* Aria-live region */}
        <div className="sr-only" aria-live="polite">
          {loading ? t("booking.submitting") : ""}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            {t("booking.name")}
          </label>
          <input
            type="text"
            name="name"
            required
            value={formValues.name}
            onChange={handleChange}
            placeholder={t("booking.name_placeholder")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            {t("booking.email")}
          </label>
          <input
            type="email"
            name="email"
            required
            value={formValues.email}
            onChange={handleChange}
            placeholder={t("booking.email_placeholder")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            {t("booking.phone")}
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formValues.phone}
            onChange={handleChange}
            placeholder={t("booking.phone_placeholder")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Service Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            {t("booking.service_type")}
          </label>
          <select
            name="service"
            required
            value={selectedService}
            onChange={handleServiceChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">{t("booking.option_default")}</option>
            <option value="Room/Hotel Booking Help">{t("booking.opt1")}</option>
            <option value="VIP Darshan">{t("booking.opt2")}</option>
            <option value="Need a Vehicle">{t("booking.opt3")}</option>
            <option value="Vrindavan Tour Guide">{t("booking.opt4")}</option>
            <option value="Food Seva">{t("booking.opt5")}</option>
            <option value="Hotel Seva">{t("booking.opt6")}</option>
            <option value="Other">{t("booking.opt_other")}</option>
          </select>
        </div>

        {/* Custom Service */}
        {selectedService === "Other" && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-red-700 mb-1">
              {t("booking.custom_service")}
            </label>
            <input
              type="text"
              name="customService"
              required
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              placeholder={t("booking.custom_service_placeholder")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        )}

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-red-700 mb-1">
            {t("booking.message")}
          </label>
          <textarea
            name="message"
            rows="4"
            placeholder={t("booking.message_placeholder")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          ></textarea>
        </div>

        {/* Submit Button */}
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
          {loading ? t("booking.submitting") : t("booking.submit")}
        </button>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-green-600 font-semibold text-center"
          >
            ✅ {t("booking.success")}
          </motion.div>
        )}
      </form>
    </motion.section>
  );
};

export default BookingForm;
