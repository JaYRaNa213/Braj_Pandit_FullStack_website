// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#4A1C1C] text-white py-10 px-6 mt-20 dark:bg-[#1F1B1B] dark:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3">About BrajPandit</h3>
          <p className="text-sm text-gray-300 dark:text-gray-400">
            We are your trusted spiritual partner offering professional pandits for pooja services, live bhajan, religious products, and blog knowledge — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/blogs" className="hover:underline">Blogs</a></li>
            <li><a href="/booking" className="hover:underline">Puja Booking</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <p className="text-sm text-gray-300 dark:text-gray-400">📞 +91 6395857663</p>
          <p className="text-sm text-gray-300 dark:text-gray-400">📞 +91 6398152781</p>
          <p className="text-sm text-gray-300 dark:text-gray-400">📧 support@brajpandit.in</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-yellow-300 transition">Facebook</a>
            <a href="#" className="hover:text-yellow-300 transition">Instagram</a>
            <a href="#" className="hover:text-yellow-300 transition">YouTube</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8">
        © {new Date().getFullYear()} BrajPandit. All rights reserved.
      </div>

      {/* Legal Warning */}
      <div className="text-center text-xs text-red-300 dark:text-red-400 mt-2 italic">
        ⚠️ Unauthorized copying or reuse of this code or design is strictly prohibited. Legal action may be taken against violators.
      </div>
    </footer>
  );
};

export default Footer;
