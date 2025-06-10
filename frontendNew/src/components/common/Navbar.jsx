// src/components/common/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#4A1C1C] p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/images/pank.jpg" alt="Logo" className="h-14 w-10 object-contain" />
        <Link to="/" className="text-xl font-bold">
          Mero Vrindavan !
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
            {/* Show Dashboard link based on role */}
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
  );
}
