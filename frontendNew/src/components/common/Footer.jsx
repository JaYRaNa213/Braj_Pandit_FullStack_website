// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#4A1C1C] text-white py-10 px-6 mt-20 dark:bg-[#1F1B1B] dark:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3">{t("footer.about_title")}</h3>
          <p className="text-sm text-gray-300 dark:text-gray-400">
            {t("footer.about_text")}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">{t("footer.quick_links")}</h3>
          <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
            <li>
              <a href="/" className="hover:underline">
                {t("footer.links.home")}
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                {t("footer.links.products")}
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:underline">
                {t("footer.links.blogs")}
              </a>
            </li>
            <li>
              <a href="/booking" className="hover:underline">
                {t("footer.links.booking")}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                {t("footer.links.contact")}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">{t("footer.contact")}</h3>
          <p className="text-sm text-gray-300 dark:text-gray-400">
            📞 +91 8595009640
          </p>
          <p className="text-sm text-gray-300 dark:text-gray-400">
            📞 +91 8979923233
          </p>
          <p className="text-sm text-gray-300 dark:text-gray-400">
            📧 brajpandit123@gmail.com
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-3">{t("footer.follow_us")}</h3>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-yellow-300 transition">
              Facebook
            </a>
            <a href="https://www.instagram.com/vedagyanam_official?igsh=ODkyNHhmczZiYnhh" className="hover:text-yellow-300 transition">
              Instagram
            </a>
            <a href="https://youtube.com/@vedagyanam?si=587Ev8d_yQzUOVE4" className="hover:text-yellow-300 transition">
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8">
        © {new Date().getFullYear()} BrajPandit. {t("footer.rights_reserved")}
      </div>

      {/* Legal Warning */}
      <div className="text-center text-xs text-red-300 dark:text-red-400 mt-2 italic">
        ⚠️ {t("footer.legal_warning")}
      </div>
    </footer>
  );
};

export default Footer;
