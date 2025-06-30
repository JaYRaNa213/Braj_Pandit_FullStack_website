// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/components/Loader.jsx

import React from "react";

export default function Loader({ small = false }) {
  return (
    <div className={`flex items-center justify-center ${small ? "" : "min-h-[100px]"}`}>
      <div
        className={`animate-spin rounded-full border-4 border-purple-500 border-t-transparent ${
          small ? "w-5 h-5" : "w-12 h-12"
        }`}
      ></div>
    </div>
  );
}
