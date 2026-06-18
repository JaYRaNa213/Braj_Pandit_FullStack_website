// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';
import { useTranslation } from 'react-i18next';

const steps = ["Ordered", "Packed", "Shipped", "Delivered"];

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    getOrderById(id).then((res) => {
      if (res.success) setOrder(res.order);
    });
  }, [id]);

  const getStepIndex = (status) => {
    const index = steps.findIndex((s) => s.toLowerCase() === status.toLowerCase());
    return index === -1 ? 0 : index;
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400 text-lg">{t("order.loading")}</p>
      </div>
    );
  }

  const currentStep = getStepIndex(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-2xl p-6 md:p-8 border dark:border-gray-700">
        <h2 className="text-3xl font-bold text-red-700 dark:text-yellow-400 mb-6">
          📦 {t("order.track")}
        </h2>

        {/* Order Info */}
        <div className="space-y-2 text-sm sm:text-base mb-6">
          <p><strong>🆔 {t("order.id")}:</strong> {order._id}</p>
          <p>
            <strong>📌 {t("order.status")}:</strong>{" "}
            <span className="text-blue-700 dark:text-blue-400 font-semibold">
              {t(`order.steps.${order.status.toLowerCase()}`)}
            </span>
          </p>
          <p><strong>💰 {t("order.total")}:</strong> ₹{order.totalAmount.toFixed(2)}</p>
          <p><strong>🕒 {t("order.date")}:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>💳 {t("order.payment")}:</strong> {order.paymentMethod.toUpperCase()}</p>
        </div>

        {/* Tracking Bar */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">🚚 {t("order.progress")}</h3>
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 text-center z-10">
                <div
                  className={`w-8 h-8 mx-auto rounded-full text-white flex items-center justify-center
                  ${index <= currentStep ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                  {index + 1}
                </div>
                <p className="text-xs mt-1">{t(`order.steps.${step.toLowerCase()}`)}</p>
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 z-0 h-1 bg-gray-300 dark:bg-gray-700 mx-4 rounded-full"></div>
            <div
              className="absolute top-4 left-0 z-0 h-1 bg-green-600 mx-4 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">📃 {t("order.products")}</h3>
          <ul className="space-y-4">
            {order.products.map((item) => (
              <li
                key={item.productId?._id}
                className="flex items-center gap-4 p-4 border rounded-lg shadow bg-white dark:bg-gray-800 dark:border-gray-600"
              >
                <img
                  src={item.productId?.imageUrl || "/default-product.png"}
                  alt={item.productId?.name}
                  className="w-16 h-16 object-cover rounded border dark:border-gray-500"
                />
                <div>
                  <p className="font-semibold">{item.productId?.name || t("order.unnamed")}</p>
                  <p className="text-sm">{t("order.qty")}: {item.quantity}</p>
                  <p className="text-sm">{t("order.price")}: ₹{item.productId?.price?.toFixed(2) || 0}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/orders")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            ← {t("order.back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
