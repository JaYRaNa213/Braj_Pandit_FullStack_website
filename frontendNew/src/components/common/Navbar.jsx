import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Link as ScrollLink,
  scroller,
} from "react-scroll";
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

  const isHome = location.pathname === "/";

  const smoothScrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -80,
    });
    setMenuOpen(false);
  };

  const handleNavClick = (sectionId, route) => {
    if (isHome) {
      smoothScrollToSection(sectionId);
    } else {
      navigate(`/${route}`);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#4A1C1C] text-white shadow-md backdrop-blur bg-opacity-95">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/images/pank.jpg"
              alt="Logo"
              className="h-12 w-9 object-contain"
            />
            <RouterLink to="/" className="text-xl font-bold">
              Mero Vrindavan!
            </RouterLink>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <RouterLink to="/" className="hover:underline">
              Home
            </RouterLink>

            <span
              className="cursor-pointer hover:underline"
              onClick={() => handleNavClick("blogs", "blogs")}
            >
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
                  <RouterLink to="/admin" className="hover:underline">
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

            <span onClick={() => handleNavClick("blogs", "blogs")}>
              Blogs
            </span>

            <span onClick={() => handleNavClick("products", "products")}>
              Products
            </span>

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
                  <RouterLink to="/admin" onClick={() => setMenuOpen(false)}>
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
