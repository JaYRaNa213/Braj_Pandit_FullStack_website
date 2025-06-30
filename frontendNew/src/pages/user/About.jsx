// 🔐 Developed by Jay Rana © 2025

// ✅ About.jsx
import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-[#4A1C1C] dark:text-white mb-6 text-center">About Us</h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-justify">
        <strong>Braj Pandit</strong> is a digital devotional platform created to connect devotees with verified pandits,
        puja services, bhajan events, and religious products. Rooted in the spiritual culture of Braj (Mathura–Vrindavan),
        we aim to simplify your spiritual journey online.
      </p>

      <h2 className="text-2xl font-semibold text-red-700 dark:text-yellow-400 mt-8 mb-4">🌟 Our Mission</h2>
      <p className="text-gray-700 dark:text-gray-300 text-justify">
        We strive to revive and digitize traditional religious practices so that every devotee—regardless of location—can
        book pujas, attend bhajans, and seek divine blessings effortlessly.
      </p>

      <h2 className="text-2xl font-semibold text-red-700 dark:text-yellow-400 mt-8 mb-4">👨‍💻 Founder</h2>
      <p className="text-gray-700 dark:text-gray-300 text-justify">
        This platform was founded by <strong>Jay Rana</strong>, a Computer Science engineer with deep devotion toward
        spiritual values and Indian traditions. With a passion for combining tech and tradition, he built this full-stack platform
        for all spiritual needs.
      </p>

      <h2 className="text-2xl font-semibold text-red-700 dark:text-yellow-400 mt-8 mb-4">🤝 Our Vision</h2>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
        <li>Digitize all rituals, bhajans, and bookings.</li>
        <li>Promote Vedic culture among youth.</li>
        <li>Offer verified pandits with transparency & respect.</li>
        <li>Enable easy access to pujas even from abroad.</li>
      </ul>
    </div>
  );
};

export default About;