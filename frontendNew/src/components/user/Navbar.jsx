// import React from "react";
// import { NavLink } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-700 text-white p-4 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <NavLink to="/" className="text-2xl font-bold">
//           BrajPandit
//         </NavLink>

//         <div className="space-x-6">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? "underline font-semibold" : "hover:underline"
//             }
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/blogs"
//             className={({ isActive }) =>
//               isActive ? "underline font-semibold" : "hover:underline"
//             }
//           >
//             Blogs
//           </NavLink>

//           <NavLink
//             to="/products"
//             className={({ isActive }) =>
//               isActive ? "underline font-semibold" : "hover:underline"
//             }
//           >
//             Products
//           </NavLink>

//           <NavLink
//             to="/booking"
//             className={({ isActive }) =>
//               isActive ? "underline font-semibold" : "hover:underline"
//             }
//           >
//             Bookings
//           </NavLink>

//           <NavLink
//             to="/contact"
//             className={({ isActive }) =>
//               isActive ? "underline font-semibold" : "hover:underline"
//             }
//           >
//             Contact
//           </NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/user/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-700 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        🕉️ DharmaSite User
      </Link>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/blogs" className="hover:underline">Blogs</Link>
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/booking" className="hover:underline">Booking</Link>

        {user ? (
          <>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
