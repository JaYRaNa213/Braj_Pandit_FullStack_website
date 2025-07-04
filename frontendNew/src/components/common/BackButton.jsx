// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const shouldShow =
    location.pathname !== "/" &&
    location.pathname !== "/home" &&
    location.pathname !== "/login";

  if (!shouldShow) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-[#C0402B] text-white dark:bg-red-500 dark:text-white font-medium rounded-full shadow-md hover:shadow-lg hover:bg-[#a83220] dark:hover:bg-red-400 transition duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        {t("buttons.back")}
      </button>
    </div>
  );
};

export default BackButton;
