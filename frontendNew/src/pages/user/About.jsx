// 🔐 Developed by Jay Rana © 2025

import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
          className="px-4 py-2 rounded-md bg-yellow-600 text-white text-sm font-semibold"
        >
          {i18n.language === "en" ? "हिंदी में पढ़ें" : "Read in English"}
        </button>
      </div>

      <h1 className="text-4xl font-bold text-[#4A1C1C] dark:text-white mb-6 text-center">
        {t("about.title")}
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-justify">
        <strong>{t("about.brand")}</strong> {t("about.intro")}
      </p>

      <h2 className="text-2xl font-semibold text-red-700 dark:text-yellow-400 mt-8 mb-4">
        🌟 {t("about.missionTitle")}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-justify">
        {t("about.mission")}
      </p>

      <h2 className="text-2xl font-semibold text-red-700 dark:text-yellow-400 mt-8 mb-4">
        👨‍💻 {t("about.founderTitle")}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-justify">
        {t("about.founder")}
      </p>

      <h2 className="text-2xl font-semibold text-red-700 dark:text-yellow-400 mt-8 mb-4">
        🤝 {t("about.visionTitle")}
      </h2>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
        <li>{t("about.vision.point1")}</li>
        <li>{t("about.vision.point2")}</li>
        <li>{t("about.vision.point3")}</li>
        <li>{t("about.vision.point4")}</li>
      </ul>
    </div>
  );
};

export default About;
