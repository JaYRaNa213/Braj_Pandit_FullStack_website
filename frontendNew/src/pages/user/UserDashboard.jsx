// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/user/UserDashboard.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../utils/config";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/bookings/my`, {
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
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Header Section with Avatar */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white py-8 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar || user?.profilePic || "/default-avatar.png"}
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Welcome, {user?.name || "User"}
                </h1>
                <p className="text-white/90 text-sm sm:text-base">
                  Explore your profile, orders, and puja bookings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Cards */}
          <div className="lg:col-span-1 space-y-4">
            <Link
              to="/profile"
              className="block bg-blue-50 border border-blue-200 hover:shadow transition p-5 rounded-xl"
            >
              <h2 className="text-lg font-semibold text-blue-800">Profile</h2>
              <p className="text-sm text-blue-600 mt-1">Update your personal details</p>
            </Link>
            <Link
              to="/orders"
              className="block bg-yellow-50 border border-yellow-200 hover:shadow transition p-5 rounded-xl"
            >
              <h2 className="text-lg font-semibold text-yellow-800">My Orders</h2>
              <p className="text-sm text-yellow-700 mt-1">Track your spiritual product orders</p>
            </Link>
            <Link
              to="/blogs"
              className="block bg-purple-50 border border-purple-200 hover:shadow transition p-5 rounded-xl"
            >
              <h2 className="text-lg font-semibold text-purple-800">Blogs</h2>
              <p className="text-sm text-purple-700 mt-1">Read latest articles and insights</p>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 mt-4 rounded-xl font-semibold transition"
            >
              Logout
            </button>
          </div>

          {/* Booking Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Recent Puja Bookings</h2>
            {bookings.length === 0 ? (
              <div className="text-gray-500 text-sm">You have no bookings yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-base font-semibold text-orange-700">
                        {booking.service}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
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
                      <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
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
