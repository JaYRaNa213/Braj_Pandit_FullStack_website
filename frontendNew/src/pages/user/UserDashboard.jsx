// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-100 to-pink-50 dark:from-zinc-900 dark:to-zinc-800 py-10 px-4 transition-all">
      <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700">
        {/* Header Section with Avatar */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white py-8 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar || user?.profilePic || "/default-avatar.png"}
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome, {user?.name || "User"}</h1>
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
              className="block bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition p-5 rounded-xl"
            >
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Profile</h2>
              <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">Update your personal details</p>
            </Link>
            <Link
              to="/orders"
              className="block bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 hover:shadow-lg transition p-5 rounded-xl"
            >
              <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">My Orders</h2>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Track your spiritual product orders</p>
            </Link>
            <Link
              to="/blogs"
              className="block bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 hover:shadow-lg transition p-5 rounded-xl"
            >
              <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Blogs</h2>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Read latest articles and insights</p>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 mt-4 rounded-xl font-semibold transition shadow-lg"
            >
              Logout
            </button>
          </div>

          {/* Booking Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Recent Puja Bookings</h2>
            {bookings.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400 text-sm">You have no bookings yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="border border-gray-200 dark:border-zinc-700 rounded-xl p-5 shadow-sm bg-white dark:bg-zinc-800 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-base font-semibold text-orange-700 dark:text-orange-300">
                        {booking.service}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
                            : booking.status === "cancelled"
                            ? "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200"
                            : "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Time:</strong> {booking.time}
                    </p>
                    {booking.additionalInfo && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
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
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-zinc-700 py-4">
          © {new Date().getFullYear()} Vrinda Spirituals. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;