// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React from "react";
import { Link } from "react-router-dom";
import { FaRegTimesCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CancelSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-red-50 dark:from-gray-900 dark:to-gray-800 px-6">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-gray-200 dark:border-gray-700">
        <FaRegTimesCircle className="text-red-600 dark:text-red-400 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-3">
          {t("cancel.title")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
          {t("cancel.message")}
        </p>
        <Link
          to="/products"
          className="inline-block px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium transition"
        >
          🛍️ {t("cancel.browseBtn")}
        </Link>
      </div>
    </div>
  );
};

export default CancelSuccess;
