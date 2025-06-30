// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useState } from "react";
import { BACKEND_URL } from "../../utils/config";
import { toast } from "react-toastify";

const PujaBooking = () => {
  const [service] = useState("puja"); // Static service name
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedPandit, setSelectedPandit] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      service,
      date,
      time,
      pandit: selectedPandit,
      additionalInfo,
    };

    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/bookings/puja`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Puja booked successfully!");
        setDate("");
        setTime("");
        setSelectedPandit("");
        setAdditionalInfo("");
      } else {
        toast.error(`❌ ${data.message || "Booking failed."}`);
      }
    } catch (err) {
      console.error("Booking Error:", err);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
      <form
        onSubmit={handleBooking}
        className="w-full max-w-md p-6 rounded-xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-all"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-700 dark:text-yellow-300">
          📿 Book a Puja
        </h2>

        {/* Date */}
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">Puja Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
        />

        {/* Time */}
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">Puja Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
        />

        {/* Pandit */}
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">Select Pandit</label>
        <select
          value={selectedPandit}
          onChange={(e) => setSelectedPandit(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="">-- Choose Pandit --</option>
          <option value="pandit1">Pandit 1</option>
          <option value="pandit2">Pandit 2</option>
        </select>

        {/* Additional Info */}
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
          Additional Information
        </label>
        <textarea
          rows={3}
          placeholder="Any special requests..."
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="w-full mb-6 p-2 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Booking..." : "Book Puja"}
        </button>
      </form>
    </div>
  );
};

export default PujaBooking;
