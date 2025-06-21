// // UserDashboard.jsx






import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  fetch("http://localhost:7000/api/bookings/my", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setBookings(data.data || []))
    .catch((err) => console.error("Error fetching bookings:", err));
}, []);


  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-100 to-pink-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-white py-8 px-6 text-center">
          <h1 className="text-4xl font-bold mb-2">🌸 Welcome, {user?.name || "Devotee"}!</h1>
          <p className="text-md text-white/90">May your journey to devotion be smooth and divine.</p>
        </div>

        {/* Main Content Section */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Cards */}
          <div className="lg:col-span-1 space-y-4">
            <Link
              to="/profile"
              className="block bg-blue-100 border border-blue-300 hover:shadow-md transition p-5 rounded-xl"
            >
              <h2 className="text-xl font-semibold text-blue-800">👤 View / Edit Profile</h2>
              <p className="text-sm text-blue-600 mt-1">Update your personal details.</p>
            </Link>
            <Link
              to="/orders"
              className="block bg-yellow-100 border border-yellow-300 hover:shadow-md transition p-5 rounded-xl"
            >
              <h2 className="text-xl font-semibold text-yellow-800">📦 My Orders</h2>
              <p className="text-sm text-yellow-700 mt-1">Track your religious product orders.</p>
            </Link>
            <Link
              to="/blogs"
              className="block bg-purple-100 border border-purple-300 hover:shadow-md transition p-5 rounded-xl"
            >
              <h2 className="text-xl font-semibold text-purple-800">📚 Religious Blogs</h2>
              <p className="text-sm text-purple-700 mt-1">Read the latest articles and updates.</p>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 mt-4 rounded-xl font-semibold"
            >
              🚪 Logout
            </button>
          </div>

          {/* Booking Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">📅 Your Recent Puja Bookings</h2>
            {bookings.length === 0 ? (
              <div className="text-gray-500 text-sm">You have no bookings yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="border border-gray-200 rounded-xl p-5 shadow-sm bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-pink-700">{booking.service}</h3>
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong>{" "}
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Time:</strong> {booking.time}
                    </p>
                    {booking.additionalInfo && (
                      <p className="text-sm text-gray-500 mt-2">
                        <strong>Note:</strong> {booking.additionalInfo}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t py-4">
          © {new Date().getFullYear()} Vrinda Spirituals. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
