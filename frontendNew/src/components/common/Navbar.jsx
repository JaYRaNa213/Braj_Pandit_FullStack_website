// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pujaServices from "../../data/pujaServices.json";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const isHome = location.pathname === "/";
  const hideCartIcon = ["/login", "/register"].includes(location.pathname);

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

  const handleNavClick = (sectionId, route) => {
    if (isHome) {
      scroller.scrollTo(sectionId, {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -80,
      });
    } else {
      navigate(`/${route}`);
    }
    setMenuOpen(false);
  };

  const handleBlogsClick = () => {
    if (isHome) {
      scroller.scrollTo("blogSection", {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -80,
      });
    } else {
      navigate("/blogs");
    }
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#4A1C1C] text-white shadow-md backdrop-blur bg-opacity-95 dark:bg-[#1F1B1B] dark:text-white">
      <div className="flex items-center px-4 py-3 md:px-6">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center gap-2">
          <img
            src="/images/premMandir.jpg"
            alt="Prem Mandir Logo"
            className="h-10 w-8 object-cover rounded-md"
          />
          <span className="text-lg font-bold">Braj Pandit</span>
        </RouterLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm ml-10">
          <RouterLink to="/" className="hover:underline">Home</RouterLink>

          <div
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="cursor-pointer hover:underline">Services ▾</span>
            {dropdownOpen && (
              <div
                className="absolute bg-white dark:bg-gray-800 dark:text-white text-[#4A1C1C] rounded shadow top-full left-0 mt-2 p-4 z-50"
                style={{ minWidth: "300px", maxHeight: "500px", overflowY: "auto" }}
              >
                <div className="grid grid-flow-col auto-cols-max gap-3 text-sm text-nowrap">
                  {pujaServices.reduce((cols, service, i) => {
                    const col = Math.floor(i / 8);
                    if (!cols[col]) cols[col] = [];
                    cols[col].push(service);
                    return cols;
                  }, []).map((group, idx) => (
                    <div key={idx} className="min-w-[160px]">
                      {group.map((service, i) => (
                        <RouterLink
                          key={i}
                          to={`/puja-details?service=${encodeURIComponent(service.title)}`}
                          className="block hover:underline text-[13px] truncate"
                        >
                          {service.title}
                        </RouterLink>
                      ))}
                    </div>
                  ))}
                  <div className="min-w-[160px] mt-6">
                    <RouterLink
                      to="/all-puja-services"
                      className="block text-[13px] font-semibold hover:underline text-blue-600 dark:text-orange-300"
                    >
                      🔍 See All Services
                    </RouterLink>
                  </div>
                </div>
              </div>
            )}
          </div>

          <span className="cursor-pointer hover:underline" onClick={handleBlogsClick}>Blogs</span>
          <span className="cursor-pointer hover:underline" onClick={() => handleNavClick("products", "products")}>Products</span>
          {isHome ? (
            <ScrollLink
              to="verifiedPandits"
              smooth="easeInOutQuart"
              duration={1000}
              offset={-80}
              className="cursor-pointer hover:underline"
            >
              Book Pandit
            </ScrollLink>
          ) : (
            <RouterLink to="/booking" className="hover:underline">Book Pandit</RouterLink>
          )}
          <RouterLink to="/about" className="hover:underline">About Us</RouterLink>
        </div>

        {/* Right: Cart + User */}
        <div className="hidden md:flex items-center gap-4 ml-auto relative">
          {!hideCartIcon && (
            <RouterLink to="/cart" className="relative group">
              <div className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow group-hover:scale-110 transition-transform">
                <FaShoppingCart size={20} />
              </div>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                  {cartItems.length}
                </span>
              )}
            </RouterLink>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-white/10 transition"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="text-xl">👤</span>
                )}
              </button>

              <AnimatePresence>
                {profileDropdown && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 font-semibold border-b border-gray-200 dark:border-gray-700">
                      {user.name || "User"}
                    </div>
                    <RouterLink to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</RouterLink>
                    <RouterLink to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</RouterLink>
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>
                    {user.role === "admin" && (
                      <RouterLink to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Admin Dashboard</RouterLink>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <RouterLink to="/login" className="hover:underline">Login</RouterLink>
              <RouterLink to="/register" className="hover:underline">Register</RouterLink>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-start px-6 pb-4 md:hidden space-y-3 bg-[#4A1C1C] text-white text-sm dark:bg-[#1F1B1B]">
          <RouterLink to="/" onClick={() => setMenuOpen(false)}>Home</RouterLink>

          <details className="w-full">
            <summary className="cursor-pointer">Services</summary>
            <div className="ml-4 mt-2 space-y-1 max-h-72 overflow-y-auto">
              {pujaServices.map((service, i) => (
                <RouterLink
                  key={i}
                  to={`/puja-details?service=${encodeURIComponent(service.title)}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline block"
                >
                  {service.title}
                </RouterLink>
              ))}
              <RouterLink
                to="/all-puja-services"
                onClick={() => setMenuOpen(false)}
                className="mt-2 font-semibold hover:underline block"
              >
                🔍 See All Services
              </RouterLink>
            </div>
          </details>

          <span onClick={handleBlogsClick}>Blogs</span>
          <span onClick={() => handleNavClick("products", "products")}>Products</span>
          <RouterLink to="/booking" onClick={() => setMenuOpen(false)}>Book Pandit</RouterLink>
          <RouterLink to="/about" onClick={() => setMenuOpen(false)}>About Us</RouterLink>

          {/* Toggle Light/Dark Mode in Mobile */}
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              setMenuOpen(false);
            }}
            className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 w-full text-left"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {user ? (
            <>
              <RouterLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</RouterLink>
              <RouterLink to="/settings" onClick={() => setMenuOpen(false)}>Settings</RouterLink>
              {user.role === "admin" && (
                <RouterLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</RouterLink>
              )}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <RouterLink to="/login" onClick={() => setMenuOpen(false)}>Login</RouterLink>
              <RouterLink to="/register" onClick={() => setMenuOpen(false)}>Register</RouterLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
