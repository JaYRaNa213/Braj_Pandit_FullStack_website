// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderTracking } from "../../services/user/userService";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const OrderTracking = () => {
  const { id } = useParams();
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

  const STATUS_FLOW = [
    t("orderTracking.status.pending"),
    t("orderTracking.status.confirmed"),
    t("orderTracking.status.packed"),
    t("orderTracking.status.shipped"),
    t("orderTracking.status.delivered"),
  ];

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const res = await getOrderTracking(id);
        if (!res.success) {
          setError(res.message || t("orderTracking.errors.notAvailable"));
          setLoading(false);
          return;
        }

        setTracking(res.data);
      } catch (err) {
        console.error("Error fetching tracking:", err);
        setError(t("orderTracking.errors.general"));
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [id, t]);

  if (loading) {
    return (
      <div className="p-10 flex items-center gap-2 text-[#C0402B]">
        <Loader2 className="animate-spin" /> {t("orderTracking.loading")}
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  const currentIndex = STATUS_FLOW.findIndex(
    (status) => status.toLowerCase() === tracking.status?.toLowerCase()
  );

  const product = tracking.product || {};
  const imageUrl = product.imageUrl || "/default-product.png";
  const deliveryETA = tracking.eta || t("orderTracking.eta.default");

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
          className="px-4 py-2 rounded-md bg-yellow-600 text-white text-sm font-semibold"
        >
          {i18n.language === "en" ? "हिंदी में पढ़ें" : "Read in English"}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-[#C0402B] dark:text-red-400">
        🚚 {t("orderTracking.title")}
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <img
          src={imageUrl}
          alt={product.name || "Product"}
          className="w-40 h-40 object-cover rounded-xl shadow border"
          onError={(e) => (e.target.src = "/default-product.png")}
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("orderTracking.trackingId")} <span className="font-medium">{id}</span>
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">
            {deliveryETA}
          </p>
        </div>
      </div>

      <div className="relative flex justify-between items-center mb-10">
        {STATUS_FLOW.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={index} className="flex flex-col items-center w-full text-center relative z-10">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-600 text-white border-green-600"
                    : isCurrent
                    ? "bg-yellow-400 text-black border-yellow-500 animate-pulse"
                    : "bg-gray-300 text-gray-700 border-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-[13px] font-medium transition ${
                  isCompleted || isCurrent
                    ? "text-[#C0402B] dark:text-red-400"
                    : "text-gray-500"
                }`}
              >
                {status}
              </span>
            </div>
          );
        })}

        <div className="absolute top-4 left-4 right-4 h-1 bg-gray-300 z-0 rounded-full">
          <div
            className="h-1 bg-green-600 rounded-full transition-all duration-700 ease-in-out"
            style={{
              width: `${(currentIndex / (STATUS_FLOW.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {tracking.history?.map((step, idx) => (
          <div key={idx} className="flex items-start space-x-4">
            <div className="mt-1 w-3 h-3 rounded-full bg-green-600"></div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {t(`orderTracking.status.${step.status.toLowerCase()}`)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(step.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
