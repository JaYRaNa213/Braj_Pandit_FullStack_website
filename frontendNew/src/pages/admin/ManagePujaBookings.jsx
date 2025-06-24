import React, { useEffect, useState } from "react";
import {
  getPujaBookings,
  deletePujaBooking,
} from "../../services/admin/adminService";

const ManagePujaBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [total, setTotal] = useState(0);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getPujaBookings({ page, limit, search, sort });
      setBookings(response.data || []);
      setTotal(response.total || 0);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, search, sort]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deletePujaBooking(id);
        fetchBookings();
      } catch {
        alert("Failed to delete booking.");
      }
    }
  };

  const handleConfirm = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:7000/api/admin/puja/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "confirmed" }),
        }
      );

      const data = await res.json();
      if (data.success) {
        fetchBookings();
      } else {
        alert("Failed to confirm booking.");
      }
    } catch (err) {
      console.error("Error confirming booking:", err);
      alert("Error confirming booking.");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-red-700 mb-6">
        Manage Puja Bookings
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by service or pandit"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-full md:w-1/2"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded p-2 w-full md:w-1/4"
        >
          <option value="date">Sort by Date (Asc)</option>
          <option value="-date">Sort by Date (Desc)</option>
          <option value="service">Sort by Service</option>
          <option value="pandit">Sort by Pandit</option>
        </select>
      </div>

      {loading ? (
        <div>Loading bookings...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded border border-gray-300">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 border-b">User</th>
                  <th className="p-3 border-b">Service</th>
                  <th className="p-3 border-b">Pandit</th>
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Time</th>
                  <th className="p-3 border-b text-center">Status</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 border-b text-gray-800"
                  >
                    <td className="p-3">{booking.userName}</td>
                    <td className="p-3">{booking.service}</td>
                    <td className="p-3">{booking.pandit}</td>
                    <td className="p-3">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">{booking.time}</td>
                    <td className="p-3 text-center">
                      {booking.status === "confirmed" ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          Confirmed
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center space-x-2">
                      {booking.status !== "confirmed" && (
                        <button
                          onClick={() => handleConfirm(booking._id)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Confirm
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              ⬅ Previous
            </button>
            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagePujaBookings;
