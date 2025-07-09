// src/components/common/TopNavbar.jsx

import React from "react";
import { useTranslation } from "react-i18next";

const TopNavbar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-red-700 dark:bg-yellow-500 text-white dark:text-black text-sm py-2 px-4 flex justify-between items-center h-[40px]">
      <p className="font-medium tracking-wide truncate w-full sm:w-auto">
        {t("topbar.announcement") || "🌟 Free shipping on all puja items!"}
      </p>
      <div className="hidden sm:flex gap-4 text-xs">
        <a href="/about" className="hover:underline">
          {t("topbar.about") || "About"}
        </a>
        <a href="/contact" className="hover:underline">
          {t("topbar.contact") || "Contact"}
        </a>
      </div>
    </div>
  );
};

export default TopNavbar;
