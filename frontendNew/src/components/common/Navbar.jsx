import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <>
      <nav className="bg-[#4A1C1C] p-4 text-white flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <img src="/images/pank.jpg" alt="Logo" className="h-14 w-10 object-contain" />
          <RouterLink to="/" className="text-xl font-bold">
            Mero Vrindavan !
          </RouterLink>
        </div>

        <div className="space-x-6 flex items-center">
          <RouterLink to="/" className="hover:underline">Home</RouterLink>
          <RouterLink to="/blogs" className="hover:underline">Blogs</RouterLink>
          <RouterLink to="/products" className="hover:underline">Products</RouterLink>

          <ScrollLink
            to="pujaServicesSection"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer hover:underline"
          >
            Puja Booking
          </ScrollLink>

          {user ? (
            <>
              {user.role === "admin" ? (
                <RouterLink to="/admin" className="hover:underline">Admin Dashboard</RouterLink>
              ) : (
                <RouterLink to="/profile" className="hover:underline">Profile</RouterLink>
              )}
              <button onClick={logout} title="Logout" className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
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
      </nav>

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
