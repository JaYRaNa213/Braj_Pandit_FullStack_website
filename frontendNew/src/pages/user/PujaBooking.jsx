// 🔐 UI/UX redesigned by ChatGPT © Jay Rana’s Devotional Platform (2025)

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { bookPuja } from "../../services/api";
import axiosInstance from "../../services/axios";
import pujaServicesData from "../../data/pujaServices.json";
import Loader from "../../components/common/Loader";
import { useTranslation } from "react-i18next";

const defaultImg =
  "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/default-puja_fallback.jpg";

export default function PujaBooking() {
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

    const matched = pujaServicesData.find(
      (p) => p.title.toLowerCase().trim() === service.toLowerCase().trim()
    );

    setPujaImage(matched?.img || defaultImg);
    setPujaDescription(matched?.description || t("pujaBooking.default_description"));

    const fetchPandits = async () => {
      try {
        const res = await axiosInstance.get("/user/pandits");
        const approved =
          res.data?.data?.filter((p) => p.status?.toLowerCase() === "approved") || [];
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
      setPujaDescription(t("pujaBooking.custom_description"));
    } else {
      setShowCustomService(false);
      setFormData((prev) => ({ ...prev, service: selected }));

      const match = pujaServicesData.find((p) => p.title === selected);
      setPujaImage(match?.img || defaultImg);
      setPujaDescription(match?.description || t("pujaBooking.default_description"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await bookPuja(formData);
      alert(t("pujaBooking.success") + ": " + res.data.message);
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
      alert(t("pujaBooking.failure"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 py-14 bg-gradient-to-br from-yellow-100 via-pink-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-black"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,145,0,0.2)] dark:shadow-yellow-900 border border-yellow-200 dark:border-gray-800">
        {/* Puja Information */}
        <div className="p-8 md:p-12 bg-gradient-to-tr from-yellow-200 via-white to-pink-100 dark:from-yellow-950 dark:to-black">
          <img
            src={pujaImage}
            alt={formData.service}
            onError={(e) => (e.target.src = defaultImg)}
            className="rounded-2xl mb-6 w-full h-64 object-cover shadow-xl border border-yellow-300 dark:border-yellow-800"
          />
          <h2 className="text-4xl font-bold text-orange-800 dark:text-yellow-300 mb-4">
            {formData.service || t("pujaBooking.default_title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {pujaDescription}
          </p>
        </div>

        {/* Booking Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-center text-orange-700 dark:text-yellow-300 mb-8">
            {t("pujaBooking.title")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("pujaForm.name")}
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("pujaForm.email")}
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <select
              name="service"
              value={commonPujas.includes(formData.service) ? formData.service : "Other"}
              onChange={handleServiceSelect}
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="">{t("pujaForm.select_puja")}</option>
              {commonPujas.map((puja, idx) => (
                <option key={idx} value={puja}>
                  {puja}
                </option>
              ))}
              <option value="Other">{t("pujaForm.custom_service")}</option>
            </select>
            {showCustomService && (
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder={t("pujaForm.custom_service")}
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            )}
            <select
              name="pandit"
              value={formData.pandit}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="">{t("pujaForm.select_pandit")}</option>
              {pandits.length > 0 ? (
                pandits.map((p) => (
                  <option key={p._id} value={p.name}>
                    {p.name} ({p.expertise}) - {p.location}
                  </option>
                ))
              ) : (
                <option disabled>{t("pujaForm.no_pandits")}</option>
              )}
            </select>
            <div className="flex gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-1/2 p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-1/2 p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder={t("pujaForm.address")}
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg transition-all"
            >
              {loading ? <Loader small /> : t("pujaForm.confirm_booking")}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
