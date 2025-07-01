import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      className={`fixed top-20 right-4 z-[99] flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm
        ${isDarkMode
          ? "bg-black text-white hover:bg-gray-800"
          : "bg-white text-black hover:bg-gray-100"}
        sm:right-6 sm:px-5 sm:py-2`}
      aria-label="Toggle Theme"
    >
      {isDarkMode ? "🌑 Dark Mode" : "🌞 Light Mode"}
    </button>
  );
};

export default ThemeToggle;
