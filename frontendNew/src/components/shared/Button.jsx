// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/components/shared/Button.jsx
import React from "react";

export default function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
}
