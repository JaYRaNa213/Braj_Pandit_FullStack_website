// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React from "react";

const ViewMoreBtn = ({ label = "View More", onClick, className = "" }) => {
  return (
    <div className="text-center my-8">
      <button
        onClick={onClick}
        className={`px-6 py-2 border-2 border-red-600 rounded-full text-red-600 hover:bg-red-50 transition ${className}`}
      >
        {label}
      </button>
    </div>
  );
};

export default ViewMoreBtn;
