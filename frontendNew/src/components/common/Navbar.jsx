// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

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

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isHome = location.pathname === "/";

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
    <>
      <nav className="sticky top-0 z-50 bg-[#4A1C1C] text-white shadow-md backdrop-blur bg-opacity-95">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/images/premMandir.jpg"
              alt="Logo"
              className="h-12 w-9 object-contain"
            />
            <RouterLink to="/" className="text-xl font-bold">
              Braj Pandit
            </RouterLink>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center relative">
            <RouterLink to="/" className="hover:underline">
              Home
            </RouterLink>

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="cursor-pointer hover:underline">Services ▾</span>
              {dropdownOpen && (
                <div className="absolute bg-white text-[#4A1C1C] rounded shadow-lg top-full left-0 mt-2 w-48 z-50">
                  <RouterLink
                    to="/services/katha"
                    className="block px-4 py-2 hover:bg-orange-100"
                  >
                    📜 Katha
                  </RouterLink>
                  <RouterLink
                    to="/services/puja"
                    className="block px-4 py-2 hover:bg-orange-100"
                  >
                    🕉️ Puja
                  </RouterLink>
                  <RouterLink
                    to="/services/bhajan"
                    className="block px-4 py-2 hover:bg-orange-100"
                  >
                    🎵 Bhajan/Kirtan
                  </RouterLink>
                  <RouterLink
                    to="/services/tour"
                    className="block px-4 py-2 hover:bg-orange-100"
                  >
                    🚌 Tour & Darshan
                  </RouterLink>
                </div>
              )}
            </div>

            <span className="cursor-pointer hover:underline" onClick={handleBlogsClick}>
              Blogs
            </span>

            <span
              className="cursor-pointer hover:underline"
              onClick={() => handleNavClick("products", "products")}
            >
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
              <RouterLink to="/booking" className="hover:underline">
                Book Pandit
              </RouterLink>
            )}

            {user ? (
              <>
                {user.role === "admin" ? (
                  <RouterLink to="/admin/dashboard" className="hover:underline">
                    Admin Dashboard
                  </RouterLink>
                ) : (
                  <RouterLink to="/profile" className="hover:underline">
                    Profile
                  </RouterLink>
                )}
                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <RouterLink to="/login" className="hover:underline">
                  Login
                </RouterLink>
                <RouterLink to="/register" className="hover:underline">
                  Register
                </RouterLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col items-start px-6 pb-4 md:hidden space-y-3 bg-[#4A1C1C] text-white">
            <RouterLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </RouterLink>

            <details className="w-full">
              <summary className="cursor-pointer">Services</summary>
              <div className="ml-4 mt-2 space-y-1">
                <RouterLink to="/services/katha" onClick={() => setMenuOpen(false)}>
                  📜 Katha
                </RouterLink>
                <RouterLink to="/services/puja" onClick={() => setMenuOpen(false)}>
                  🕉️ Puja
                </RouterLink>
                <RouterLink to="/services/bhajan" onClick={() => setMenuOpen(false)}>
                  🎵 Bhajan/Kirtan
                </RouterLink>
                <RouterLink to="/services/tour" onClick={() => setMenuOpen(false)}>
                  🚌 Tour & Darshan
                </RouterLink>
                <RouterLink to="/services/tour" onClick={() => setMenuOpen(false)}>
                  🚌 Tour & Darshan
                </RouterLink>
                <RouterLink to="/services/tour" onClick={() => setMenuOpen(false)}>
                  🚌 Tour & Darshan
                </RouterLink>
                <RouterLink to="/services/tour" onClick={() => setMenuOpen(false)}>
                  🚌 Tour & Darshan
                </RouterLink>
                <RouterLink to="/services/tour" onClick={() => setMenuOpen(false)}>
                  🚌 Tour & Darshan
                </RouterLink>
                <RouterLink to="/services/tour" onClick={() => setMenuOpen(false)}>
                  🚌 Tour & Darshan
                </RouterLink>
                <RouterLink to="/services/tour" onClick={() => setMenuOpen(false)}>
                  🚌 Tour & Darshan
                </RouterLink>
                <RouterLink to="/services/tour" onClick={() => setMenuOpen(false)}>
                  🚌 Tour & Darshan
                </RouterLink>
                <RouterLink to="/services/tour" onClick={() => setMenuOpen(false)}>
                  🚌 Tour & Darshan
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
              >
                Book Pandit
              </ScrollLink>
            ) : (
              <RouterLink to="/booking" onClick={() => setMenuOpen(false)}>
                Book Pandit
              </RouterLink>
            )}

            {user ? (
              <>
                {user.role === "admin" ? (
                  <RouterLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                    Admin Dashboard
                  </RouterLink>
                ) : (
                  <RouterLink to="/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                  </RouterLink>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <RouterLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </RouterLink>
                <RouterLink to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </RouterLink>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Floating Cart Icon */}
      <div className="fixed bottom-5 right-5 z-50">
        <RouterLink to="/cart" className="relative group">
          <div className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 transform group-hover:scale-110">
            <FaShoppingCart size={24} />
          </div>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              {cartItems.length}
            </span>
          )}
        </RouterLink>
      </div>
    </>
  );
}
