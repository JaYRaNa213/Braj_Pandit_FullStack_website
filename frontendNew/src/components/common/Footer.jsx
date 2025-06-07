// src/components/common/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-purple-700 text-white p-6 mt-8 text-center">
      <p>© {new Date().getFullYear()} DharmaSite. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">
          Instagram
        </a>
      </div>
    </footer>
  );
}
