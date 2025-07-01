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
import { useState } from "react";
import pujaServices from "../../data/pujaServices.json";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isHome = location.pathname === "/";
  const hideCartIcon = ["/login", "/register"].includes(location.pathname);

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

  const groupedServices = pujaServices.reduce((acc, service) => {
    const category = service.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {});

  return (
    <nav className="sticky top-0 z-50 bg-[#4A1C1C] text-white shadow-md backdrop-blur bg-opacity-95 dark:bg-[#1F1B1B] dark:text-white">
      <div className="flex items-center px-6 py-4 md:px-6">
        {/* Logo */}
        <RouterLink to="/" aria-label="Braj Pandit Home" className="flex items-center gap-2">
          <img
            src="/images/premMandir.jpg"
            alt="Prem Mandir Logo"
            className="h-18 w-8 object-contain rounded-full shadow-md dark:shadow-gray-900"
          />
          <span className="text-lg font-bold">Braj Pandit</span>
        </RouterLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm ml-10">
          <RouterLink to="/" className="hover:underline">Home</RouterLink>

          {/* Services Dropdown (No Grouping, Auto Columns of 8 items) */}
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
        {pujaServices.reduce((columns, service, i) => {
          const colIndex = Math.floor(i / 8);
          if (!columns[colIndex]) columns[colIndex] = [];
          columns[colIndex].push(service);
          return columns;
        }, []).map((column, colIdx) => (
          <div key={colIdx} className="min-w-[160px]">
            <ul className="space-y-1">
              {column.map((service, i) => (
                <li key={i}>
                  <RouterLink
                    to={`/puja-details?service=${encodeURIComponent(service.title)}`}
                    className="block hover:underline text-[13px] truncate"
                  >
                    {service.title}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Final Column: See All Services */}
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


          <span className="cursor-pointer hover:underline" onClick={handleBlogsClick}>
            Blogs
          </span>

          <span className="cursor-pointer hover:underline" onClick={() => handleNavClick("products", "products")}>
            Products
          </span>

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

        {/* Right Side */}
        <div className="hidden md:flex gap-6 items-center text-sm ml-auto">
          {!hideCartIcon && (
            <RouterLink to="/cart" className="relative group" aria-label="Shopping Cart">
              <div className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow transition-transform transform group-hover:scale-110 dark:shadow-gray-900">
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
            <>
              <RouterLink
                to={user.role === "admin" ? "/admin/dashboard" : "/profile"}
                className="hover:underline"
              >
                {user.role === "admin" ? "Admin Dashboard" : "Profile"}
              </RouterLink>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Logout
              </button>
            </>
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
        <div className="flex flex-col items-start px-6 pb-4 md:hidden space-y-3 bg-[#4A1C1C] text-white text-sm dark:bg-[#1F1B1B] dark:text-white">
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

          {isHome ? (
            <ScrollLink
              to="verifiedPandits"
              smooth="easeInOutQuart"
              duration={1000}
              offset={-80}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer"
            >
              Book Pandit
            </ScrollLink>
          ) : (
            <>
              <RouterLink to="/booking" onClick={() => setMenuOpen(false)}>
                Book Pandit
              </RouterLink>
              <RouterLink to="/about" onClick={() => setMenuOpen(false)}>
                About Us
              </RouterLink>
            </>
          )}

          {user ? (
            <>
              <RouterLink
                to={user.role === "admin" ? "/admin/dashboard" : "/profile"}
                onClick={() => setMenuOpen(false)}
              >
                {user.role === "admin" ? "Admin Dashboard" : "Profile"}
              </RouterLink>
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