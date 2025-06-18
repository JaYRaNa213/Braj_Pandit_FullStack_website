import React, { useEffect, useState } from "react";
import { getPujaBookings, deletePujaBooking } from "../../services/admin/adminService";

const ManagePujaBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');
  const [total, setTotal] = useState(0);

  const fetchBookings = async () => {
  try {
    setLoading(true);
    setError(null);
    console.log("Fetching bookings...");
    const response = await getPujaBookings({ page, limit, search, sort });
    console.log("Response:", response);
    setBookings(response.data || []);   // 👈 FIXED HERE
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
      } catch (err) {
        alert("Failed to delete booking.");
      }
    }
  };

  const handleConfirm = async (id) => {
  try {
    const res = await fetch(`http://localhost:7000/api/admin/puja/bookings/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // or use your context
      },
      body: JSON.stringify({ status: "confirmed" }),
    });

    const data = await res.json();
    if (data.success) {
      fetchBookings(); // refresh bookings list
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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Manage Puja Bookings</h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by service or pandit"
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
          <table className="w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border-b">User</th>
                <th className="p-3 border-b">Service</th>
                <th className="p-3 border-b">Pandit</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Time</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{booking.userName}</td>
                  <td className="p-3 border-b">{booking.service}</td>
                  <td className="p-3 border-b">{booking.pandit}</td>
                  <td className="p-3 border-b">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">{booking.time}</td>


                 <td className="p-3 border-b">
  {booking.status !== "confirmed" && (
    <button
      onClick={() => handleConfirm(booking._id)}
      className="text-green-600 hover:underline mr-3"
    >
      Confirm
    </button>
  )}
  <button
    onClick={() => handleDelete(booking._id)}
    className="text-red-600 hover:underline"
  >
    Delete
  </button>
</td>




                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
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
