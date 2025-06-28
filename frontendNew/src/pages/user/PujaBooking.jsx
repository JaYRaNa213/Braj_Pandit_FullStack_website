// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/PujaBooking.jsx
import React, { useState } from "react";
import { BACKEND_URL } from "../../utils/config";

const PujaBooking = () => {
  const [service] = useState("puja"); // Fixed service type
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedPandit, setSelectedPandit] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

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
        alert("✅ Puja booked successfully!");
        setDate("");
        setTime("");
        setSelectedPandit("");
        setAdditionalInfo("");
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleBooking}
      className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white"
    >
      <h2 className="text-xl font-semibold mb-4 text-[#4A1C1C]">Book a Puja</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full p-2 border mb-3 rounded"
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        className="w-full p-2 border mb-3 rounded"
      />

      <select
        value={selectedPandit}
        onChange={(e) => setSelectedPandit(e.target.value)}
        required
        className="w-full p-2 border mb-3 rounded"
      >
        <option value="">Select Pandit</option>
        <option value="pandit1">Pandit 1</option>
        <option value="pandit2">Pandit 2</option>
      </select>

      <textarea
        placeholder="Additional Information"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      />

      <button
        type="submit"
        className="w-full bg-[#4A1C1C] text-white py-2 px-4 rounded hover:bg-[#3b1515]"
      >
        Book Puja
      </button>
    </form>
  );
};

export default PujaBooking;
