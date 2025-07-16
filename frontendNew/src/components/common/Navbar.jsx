
// 🔐 Redesigned by ChatGPT © 2025 - Jay Rana's Devotional Platform

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaChevronDown, FaHome, FaBook, FaStore, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdLanguage } from "react-icons/md";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pujaServices from "../../data/pujaServices.json";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

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
    navigate(`/${route}`);
    setMenuOpen(false);
  };

  const handleBlogsClick = () => {
    navigate("/blogs");
    setMenuOpen(false);
  };

  const navItems = [
    { label: t("nav.home"), icon: FaHome, path: "/" },
    { label: t("nav.blogs"), icon: FaBook, onClick: handleBlogsClick },
    { label: t("nav.products"), icon: FaStore, onClick: () => handleNavClick("products", "products") },
    { label: t("nav.mathura_tourism"), icon: FaMapMarkerAlt, path: "/famous-places" }
  ];

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-gradient-to-r from-orange-900/95 via-red-900/95 to-orange-900/95 
    dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 
    shadow-2xl border-b border-orange-200/20 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <RouterLink to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/djtq2eywl/image/upload/v1751620820/logo_yre5xd.png"
                alt="Braj Pandit Logo"
                className="h-16 w-32 object-contain rounded-xl shadow-lg 
                transform group-hover:scale-105 transition-all duration-300
                ring-2 ring-orange-300/30 group-hover:ring-orange-300/60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 
              rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.path ? (
                  <RouterLink
                    to={item.path}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white
                    hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20
                    transition-all duration-300 font-medium text-sm
                    hover:text-yellow-300 hover:shadow-lg transform hover:scale-105"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </RouterLink>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white
                    hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20
                    transition-all duration-300 font-medium text-sm
                    hover:text-yellow-300 hover:shadow-lg transform hover:scale-105"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white
              hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20
              transition-all duration-300 font-medium text-sm
              hover:text-yellow-300 hover:shadow-lg transform hover:scale-105">
                <FaCalendarAlt className="w-4 h-4" />
                <span>{t("nav.services")}</span>
                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 
                ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 
                    rounded-2xl shadow-2xl border border-orange-200/20 dark:border-gray-700/50
                    backdrop-blur-xl z-50 min-w-[350px] max-h-96 overflow-y-auto
                    scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-100"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-4 
                      flex items-center space-x-2">
                        <FaCalendarAlt className="w-5 h-5" />
                        <span>पूजा सेवाएं</span>
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {pujaServices.slice(0, 12).map((service, i) => (
                          <RouterLink
                            key={i}
                            to={`/puja-details?service=${encodeURIComponent(service.title)}`}
                            className="block p-3 rounded-xl text-sm text-gray-700 dark:text-gray-300
                            hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50
                            dark:hover:from-orange-900/20 dark:hover:to-yellow-900/20
                            hover:text-orange-600 dark:hover:text-orange-400
                            transition-all duration-200 border border-transparent
                            hover:border-orange-200 dark:hover:border-orange-700/50"
                          >
                            {service.title}
                          </RouterLink>
                        ))}
                      </div>
                      <RouterLink
                        to="/all-puja-services"
                        className="block mt-4 p-3 bg-gradient-to-r from-orange-500 to-red-500
                        text-white text-center rounded-xl font-semibold
                        hover:from-orange-600 hover:to-red-600 transition-all duration-300
                        transform hover:scale-105 shadow-lg"
                      >
                        🔍 {t("nav.all_services")}
                      </RouterLink>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Pandit Button */}
            <button
              onClick={() => {
                if (location.pathname === "/") {
                  scroller.scrollTo("verifiedPandits", {
                    duration: 1000,
                    delay: 0,
                    smooth: "easeInOutQuart",
                    offset: -80,
                  });
                } else {
                  navigate("/puja-booking");
                }
                setMenuOpen(false);
              }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600
              text-white font-bold px-6 py-3 rounded-xl shadow-lg
              transform hover:scale-105 transition-all duration-300
              border-2 border-transparent hover:border-yellow-300/50"
            >
              🙏 {t("nav.book_pandit")}
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 
              text-white px-4 py-2 rounded-xl font-medium transition-all duration-300
              backdrop-blur-sm border border-white/20 hover:border-white/40"
            >
              <MdLanguage className="w-4 h-4" />
              <span className="text-sm">{i18n.language === "en" ? "हिंदी" : "English"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white
              transition-all duration-300 backdrop-blur-sm
              border border-white/20 hover:border-white/40 transform hover:scale-110"
            >
              {isDarkMode ? <MdLightMode className="w-5 h-5" /> : <MdDarkMode className="w-5 h-5" />}
            </button>

            {/* Cart Icon */}
            {!hideCartIcon && (
              <RouterLink to="/cart" className="relative group">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 
                hover:from-yellow-600 hover:to-orange-600 text-white p-3 rounded-xl 
                shadow-lg transform group-hover:scale-110 transition-all duration-300
                border-2 border-transparent group-hover:border-yellow-300/50">
                  <FaShoppingCart className="w-5 h-5" />
                </div>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white 
                  text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </RouterLink>
            )}

            {/* User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 
                  text-white px-4 py-2 rounded-xl transition-all duration-300
                  backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30"
                    />
                  ) : (
                    <FaUser className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{user.name || "User"}</span>
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-300 
                  ${profileDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 
                      rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/50
                      backdrop-blur-xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-gray-800 dark:text-white">{user.name || "User"}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <RouterLink
                          to="/profile"
                          className="block px-4 py-3 text-gray-700 dark:text-gray-300 
                          hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-200"
                        >
                          👤 {t("nav.profile")}
                        </RouterLink>
                        {user.role === "admin" && (
                          <RouterLink
                            to="/admin/dashboard"
                            className="block px-4 py-3 text-gray-700 dark:text-gray-300 
                            hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-200"
                          >
                            ⚙️ {t("nav.admin_dashboard")}
                          </RouterLink>
                        )}
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 
                          hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          🚪 {t("nav.logout")}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <RouterLink
                  to="/login"
                  className="text-white hover:text-yellow-300 font-medium 
                  px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  {t("nav.login")}
                </RouterLink>
                <RouterLink
                  to="/register"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 
                  hover:from-yellow-600 hover:to-orange-600 text-white font-medium 
                  px-6 py-2 rounded-xl shadow-lg transform hover:scale-105 
                  transition-all duration-300"
                >
                  {t("nav.register")}
                </RouterLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 
            text-white transition-all duration-300 backdrop-blur-sm"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-orange-200/20 dark:border-gray-700/50"
            >
              <div className="py-6 space-y-4">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.path ? (
                      <RouterLink
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-white 
                        hover:bg-white/10 rounded-xl transition-all duration-300"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </RouterLink>
                    ) : (
                      <button
                        onClick={() => {
                          item.onClick();
                          setMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-3 text-white 
                        hover:bg-white/10 rounded-xl transition-all duration-300 w-full text-left"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )}
                  </div>
                ))}

                {/* Mobile Services */}
                <details className="px-4">
                  <summary className="flex items-center space-x-3 py-3 text-white 
                  cursor-pointer hover:bg-white/10 rounded-xl transition-all duration-300">
                    <FaCalendarAlt className="w-5 h-5" />
                    <span className="font-medium">{t("nav.services")}</span>
                  </summary>
                  <div className="mt-3 ml-8 space-y-2 max-h-60 overflow-y-auto">
                    {pujaServices.slice(0, 10).map((service, i) => (
                      <RouterLink
                        key={i}
                        to={`/puja-details?service=${encodeURIComponent(service.title)}`}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 text-sm text-gray-300 hover:text-yellow-300 
                        transition-colors duration-200"
                      >
                        {service.title}
                      </RouterLink>
                    ))}
                    <RouterLink
                      to="/all-puja-services"
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 text-sm font-semibold text-yellow-300 
                      hover:text-yellow-400 transition-colors duration-200"
                    >
                      🔍 {t("nav.all_services")}
                    </RouterLink>
                  </div>
                </details>

                {/* Mobile Book Pandit */}
                <button
                  onClick={() => {
                    if (location.pathname === "/") {
                      scroller.scrollTo("verifiedPandits", {
                        duration: 1000,
                        delay: 0,
                        smooth: "easeInOutQuart",
                        offset: -80,
                      });
                    } else {
                      navigate("/booking");
                    }
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-white 
                  hover:bg-white/10 rounded-xl transition-all duration-300 w-full text-left"
                >
                  <FaCalendarAlt className="w-5 h-5" />
                  <span className="font-medium">🙏 {t("nav.book_pandit")}</span>
                </button>

                {/* Mobile User Actions */}
                <div className="border-t border-white/20 pt-4 mt-4 space-y-3">
                  <button
                    onClick={() => {
                      setIsDarkMode(!isDarkMode);
                      setMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 
                    text-white bg-white/10 rounded-xl"
                  >
                    <span>Theme</span>
                    {isDarkMode ? <MdLightMode className="w-5 h-5" /> : <MdDarkMode className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => {
                      toggleLanguage();
                      setMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 
                    text-white bg-white/10 rounded-xl"
                  >
                    <span>Language</span>
                    <span className="text-sm">{i18n.language === "en" ? "हिंदी" : "English"}</span>
                  </button>

                  {user ? (
                    <>
                      <RouterLink
                        to="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-white 
                        hover:bg-white/10 rounded-xl transition-all duration-300"
                      >
                        <FaUser className="w-5 h-5" />
                        <span>Profile</span>
                      </RouterLink>
                      {user.role === "admin" && (
                        <RouterLink
                          to="/admin/dashboard"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-white 
                          hover:bg-white/10 rounded-xl transition-all duration-300"
                        >
                          <span>⚙️</span>
                          <span>Admin Dashboard</span>
                        </RouterLink>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-3 text-red-400 
                        hover:bg-red-500/20 rounded-xl transition-all duration-300 w-full text-left"
                      >
                        <span>🚪</span>
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <RouterLink
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-center bg-white/10 text-white 
                        rounded-xl hover:bg-white/20 transition-all duration-300"
                      >
                        Login
                      </RouterLink>
                      <RouterLink
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-center bg-gradient-to-r 
                        from-yellow-500 to-orange-500 text-white rounded-xl shadow-lg"
                      >
                        Register
                      </RouterLink>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
