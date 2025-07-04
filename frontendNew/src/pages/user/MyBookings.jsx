// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookings } from "../../services/user/userService";
import { CalendarCheck2, Loader2 } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      if (res.success) {
        setBookings(res.data);
      } else {
        setError(res.message || "Failed to load bookings.");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Something went wrong while fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchBookings();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white dark:bg-zinc-900">
        <Loader2 className="h-6 w-6 animate-spin text-[#C0402B]" />
        <p className="ml-2 text-[#C0402B] dark:text-red-400 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 dark:from-zinc-900 dark:to-zinc-800 p-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 shadow-2xl rounded-xl p-6">
        <h1 className="text-3xl font-bold text-[#C0402B] dark:text-red-400 mb-6 flex items-center gap-2">
          <CalendarCheck2 className="w-7 h-7" />
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center mt-10">You haven’t booked any pujas yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <div
                key={index}
                className="bg-yellow-100 dark:bg-zinc-800 p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
              >
                <div>
                  <h2 className="text-lg font-semibold text-[#C0402B] dark:text-red-300">
                    {booking.pujaName || "Puja Service"}
                  </h2>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Date: {new Date(booking.date).toLocaleDateString()} | Time: {booking.time}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Location: {booking.location || "Not specified"}
                  </p>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Status: {booking.status || "Pending"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
