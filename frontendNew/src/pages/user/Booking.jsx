// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { bookPuja } from "../../services/api";
import axiosInstance from "../../services/axios";
import pujaServicesData from "../../data/pujaServices.json";
import Loader from "../../components/common/Loader";
import { useTranslation } from "react-i18next";

const defaultImg = "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/default-puja_fallback.jpg";

export default function Booking() {
  const location = useLocation();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
    pandit: "",
    address: "",
  });

  const [pujaImage, setPujaImage] = useState(defaultImg);
  const [pujaDescription, setPujaDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [pandits, setPandits] = useState([]);
  const [showCustomService, setShowCustomService] = useState(false);

  const commonPujas = pujaServicesData.map((puja) => puja.title);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const service = decodeURIComponent(params.get("service") || "");
    const pandit = decodeURIComponent(params.get("pandit") || "");

    setFormData((prev) => ({ ...prev, service, pandit }));

    if (service && !commonPujas.includes(service)) {
      setShowCustomService(true);
    }

    const matched = pujaServicesData.find((p) =>
      p.title.toLowerCase().trim() === service.toLowerCase().trim()
    );

    setPujaImage(matched?.img || defaultImg);
    setPujaDescription(
      matched?.description ||
        t("booking.default_description")
    );

    const fetchPandits = async () => {
      try {
        const res = await axiosInstance.get("/user/pandits");
        const approved = res.data?.data?.filter(
          (p) => p.status?.toLowerCase() === "approved"
        ) || [];
        setPandits(approved);
      } catch (err) {
        console.error("Failed to fetch pandits", err);
      }
    };

    fetchPandits();
  }, [location, t]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (e) => {
    const selected = e.target.value;

    if (selected === "Other") {
      setShowCustomService(true);
      setFormData((prev) => ({ ...prev, service: "" }));
      setPujaImage(defaultImg);
      setPujaDescription(t("booking.custom_description"));
    } else {
      setShowCustomService(false);
      setFormData((prev) => ({ ...prev, service: selected }));

      const match = pujaServicesData.find((p) => p.title === selected);
      setPujaImage(match?.img || defaultImg);
      setPujaDescription(
        match?.description ||
          t("booking.default_description")
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await bookPuja(formData);
      alert(t("booking.success") + ": " + res.data.message);
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
      console.error(err);
      alert(t("booking.failure"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black px-4 py-10 flex justify-center items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-7xl bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left - Puja Image & Info */}
        <div className="p-6 md:p-10 bg-purple-100 dark:bg-purple-900 border-r border-purple-300 dark:border-purple-700 flex flex-col justify-center">
          <img
            src={pujaImage}
            alt={formData.service}
            onError={(e) => (e.target.src = defaultImg)}
            className="rounded-xl mb-6 shadow-lg w-full h-64 object-cover"
          />
          <h2 className="text-3xl font-bold text-purple-800 dark:text-yellow-300 mb-4">
            {formData.service || t("booking.default_title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {pujaDescription}
          </p>
        </div>

        {/* Right - Booking Form */}
        <div className="p-6 md:p-10">
          <h2 className="text-3xl font-bold text-center text-red-700 dark:text-yellow-400 mb-6">
            {t("booking.title")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("form.name")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("form.email")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded"
              required
            />

            <select
              name="service"
              value={commonPujas.includes(formData.service) ? formData.service : "Other"}
              onChange={handleServiceSelect}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded"
              required
            >
              <option value="">{t("form.select_puja")}</option>
              {commonPujas.map((puja, idx) => (
                <option key={idx} value={puja}>{puja}</option>
              ))}
              <option value="Other">{t("form.other")}</option>
            </select>

            {showCustomService && (
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder={t("form.custom_service")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded"
                required
              />
            )}

            <select
              name="pandit"
              value={formData.pandit}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded"
              required
            >
              <option value="">{t("form.select_pandit")}</option>
              {pandits.length > 0 ? (
                pandits.map((p) => (
                  <option key={p._id} value={p.name}>
                    {p.name} ({p.expertise}) - {p.location}
                  </option>
                ))
              ) : (
                <option disabled>{t("form.no_pandits")}</option>
              )}
            </select>

            <div className="flex gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-1/2 p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-1/2 p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded"
                required
              />
            </div>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder={t("form.address")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded font-semibold tracking-wide"
            >
              {loading ? <Loader small /> : t("form.confirm_booking")}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
