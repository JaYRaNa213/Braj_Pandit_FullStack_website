import React, { useEffect, useState } from "react";
import { getPujaBookings, deletePujaBooking } from "../../services/adminService";

const ManagePujaBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination, search, sorting states
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // fixed page size or make dynamic
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');

  const [total, setTotal] = useState(0);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Pass query params to service function (we'll add them)
      const data = await getPujaBookings({ page, limit, search, sort });
      setBookings(data.data);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch bookings.");
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

  // Pagination controls
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Manage Puja Bookings</h1>

      {/* Search and Sort */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by user or puja"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-1/3"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded p-2"
        >
          <option value="date">Sort by Date (Asc)</option>
          <option value="-date">Sort by Date (Desc)</option>
          <option value="userName">Sort by User Name</option>
          <option value="pujaName">Sort by Puja Name</option>
        </select>
      </div>

      {loading ? (
        <div>Loading bookings...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <>
          <table className="w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border-b border-gray-300">User</th>
                <th className="p-3 border-b border-gray-300">Puja Name</th>
                <th className="p-3 border-b border-gray-300">Date</th>
                <th className="p-3 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-300">{booking.userName}</td>
                    <td className="p-3 border-b border-gray-300">{booking.pujaName}</td>
                    <td className="p-3 border-b border-gray-300">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(booking._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagePujaBookings;
