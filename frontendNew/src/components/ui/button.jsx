// 🔘 Reusable Button Component | Created for Jay Rana's Platform

import React from "react";
import clsx from "clsx"; // Optional: for conditional class merging (can skip if not using)

export const Button = ({
  children,
  variant = "primary", // 'primary' | 'outline' | 'ghost'
  size = "md", // 'sm' | 'md' | 'lg'
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 focus:ring-red-500",
    ghost:
      "text-red-600 hover:bg-red-100 dark:hover:bg-gray-800 focus:ring-red-500",
  };

  return (
    <button
      {...props}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
