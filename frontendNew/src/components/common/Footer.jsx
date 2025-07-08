// 🔐 Redesigned by ChatGPT © 2025 – BrajPandit Spiritual Platform

import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-[#3b0d0d] to-[#1F1B1B] text-white py-12 px-6 mt-20 dark:from-[#1a1a1a] dark:to-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">{t("footer.about_title")}</h3>
          <p className="text-gray-300 dark:text-gray-400 leading-relaxed text-justify">
            {t("footer.about_text")}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">{t("footer.quick_links")}</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-300 transition">{t("footer.links.home")}</a></li>
            <li><a href="/products" className="hover:text-yellow-300 transition">{t("footer.links.products")}</a></li>
            <li><a href="/blogs" className="hover:text-yellow-300 transition">{t("footer.links.blogs")}</a></li>
            <li><a href="/booking" className="hover:text-yellow-300 transition">{t("footer.links.booking")}</a></li>
            <li><a href="/contact" className="hover:text-yellow-300 transition">{t("footer.links.contact")}</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">{t("footer.contact")}</h3>
          <ul className="space-y-1 text-gray-300 dark:text-gray-400">
            <li>📞 +91 8595009640</li>
            <li>📞 +91 8979923233</li>
            <li>📧 brajpandit123@gmail.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">{t("footer.follow_us")}</h3>
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <img src="https://res.cloudinary.com/djtq2eywl/image/upload/v1751794911/facebook-circle-logo-blue-70175169479332995fhjt438m_aqi7dg.png" alt="Facebook" className="w-5 h-5" />
              Facebook
            </a>
            <a href="https://www.instagram.com/vedagyanam_official?igsh=ODkyNHhmczZiYnhh" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <img src="https://res.cloudinary.com/djtq2eywl/image/upload/v1751794910/instagram-logo_971166-164497_yfnzdl.avif" alt="Instagram" className="w-5 h-5" />
              Instagram
            </a>
            <a href="https://youtube.com/@vedagyanam?si=587Ev8d_yQzUOVE4" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <img src="https://res.cloudinary.com/djtq2eywl/image/upload/v1751794910/png-clipart-youtube-logo-youtube-red-logo-sunny-leone-angle-rectangle-thumbnail_lgwxiu.png" alt="YouTube" className="w-5 h-5" />
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-gray-400 dark:text-gray-500 text-sm">
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
