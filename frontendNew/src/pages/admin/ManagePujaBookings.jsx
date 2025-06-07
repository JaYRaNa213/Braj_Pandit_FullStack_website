import React, { useEffect, useState } from "react";
import { getPujaBookings, deletePujaBooking } from "../../services/adminService";

const ManagePujaBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getPujaBookings();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch bookings.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deletePujaBooking(id);
        fetchBookings(); // Refresh after delete
      } catch {
        alert("Failed to delete booking.");
      }
    }
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Puja Bookings</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Puja Name</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No bookings found.
              </td>
            </tr>
          )}
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border border-gray-300 p-2">{booking.userName}</td>
              <td className="border border-gray-300 p-2">{booking.pujaName}</td>
              <td className="border border-gray-300 p-2">
                {new Date(booking.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(booking._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePujaBookings;
