import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Link as ScrollLink,
  animateScroll as scroll,
  scroller,
} from "react-scroll";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const smoothScrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -80,
    });
  };

  const handleNavClick = (sectionId, route) => {
    if (isHome) {
      smoothScrollToSection(sectionId);
    } else {
      navigate(`/${route}`);
    }
  };

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-[#4A1C1C] p-4 text-white flex justify-between items-center shadow-md backdrop-blur bg-opacity-95">
        <div className="flex items-center space-x-4">
          <img
            src="/images/pank.jpg"
            alt="Logo"
            className="h-14 w-10 object-contain"
          />
          <RouterLink to="/" className="text-xl font-bold">
            Mero Vrindavan !
          </RouterLink>
        </div>

        <div className="space-x-6 flex items-center">
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
                title="Logout"
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
