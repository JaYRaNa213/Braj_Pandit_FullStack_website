// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/components/common/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <>
      <nav className="bg-[#4A1C1C] p-4 text-white flex justify-between items-center dark:bg-gray-900 dark:text-white">
        <div className="flex items-center space-x-4">
          <img src="/images/premMandir.jpg" alt="Logo" className="h-14 w-10 object-contain" />
          <Link to="/" className="text-xl font-bold">
            Braj Pandit
          </Link>
        </div>

        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/blogs" className="hover:underline">
            Blogs
          </Link>
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <Link to="/booking" className="hover:underline">
            Booking
          </Link>

          {user ? (
            <>
              {user.role === "admin" ? (
                <Link to="/admin" className="hover:underline">
                  Admin Dashboard
                </Link>
              ) : (
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
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
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* 🛒 Floating Cart Icon */}
      <div className="fixed bottom-5 right-5 z-50">
        <Link to="/cart" className="relative group">
          <div className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 transform group-hover:scale-110">
            <FaShoppingCart size={24} />
          </div>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </>
  );
}
