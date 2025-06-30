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
import { pujaServices } from "../../data/pujaServices"; // ✅ Updated import

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

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#4A1C1C] text-white shadow-md backdrop-blur bg-opacity-95">
        <div className="flex items-center px-4 py-2 md:px-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="/images/premMandir.jpg"
              alt="Logo"
              className="h-10 w-8 object-contain"
            />
            <RouterLink to="/" className="text-lg font-bold">
              Braj Pandit
            </RouterLink>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10 text-sm ml-10">
            <RouterLink to="/" className="hover:underline">Home</RouterLink>

            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="cursor-pointer hover:underline">Services ▾</span>
              {dropdownOpen && (
                <div className="absolute bg-white text-[#4A1C1C] rounded shadow top-full left-0 mt-2 p-2 z-50 
                  max-h-64 overflow-y-auto 
                  grid grid-rows-7 auto-cols-max grid-flow-col gap-2 text-sm whitespace-nowrap"
                >
                  {pujaServices.map((service, i) => (
                    <RouterLink
                      key={i}
                      to={`/puja-details?service=${encodeURIComponent(service.title)}`}
                      className="hover:underline px-2 py-1"
                    >
                      {service.title}
                    </RouterLink>
                  ))}
                  <RouterLink
                    to="/services"
                    className="font-semibold text-sm hover:underline mt-2 col-span-full"
                  >
                    🔍 See All Services
                  </RouterLink>
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
              <RouterLink to="/booking" className="hover:underline">
                Book Pandit
              </RouterLink>
            )}

            <RouterLink to="/about" className="hover:underline">
              About Us
            </RouterLink>
          </div>

          {/* Right Auth + Cart Section */}
          <div className="hidden md:flex gap-6 items-center text-sm ml-auto">
            {!hideCartIcon && (
              <RouterLink to="/cart" className="relative group">
                <div className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow transition-transform transform group-hover:scale-110">
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
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
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

          {/* Hamburger Icon (Mobile Only) */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col items-start px-6 pb-4 md:hidden space-y-3 bg-[#4A1C1C] text-white text-sm">
            <RouterLink to="/" onClick={() => setMenuOpen(false)}>Home</RouterLink>

            <details className="w-full">
              <summary className="cursor-pointer">Services</summary>
              <div className="ml-6 mt-2 space-y-1 max-h-72 overflow-y-auto">
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
                  to="/services"
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
                <RouterLink to="/login" onClick={() => setMenuOpen(false)}>Login</RouterLink>
                <RouterLink to="/register" onClick={() => setMenuOpen(false)}>Register</RouterLink>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
