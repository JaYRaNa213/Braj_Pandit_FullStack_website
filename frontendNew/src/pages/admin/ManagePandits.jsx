import React, { useEffect, useState } from "react";
import {
  getAdminAllPandits,
  deletePandit,
  updatePanditStatus,
} from "../../services/admin/panditService";
import { toast } from "react-toastify";

const ManagePandits = () => {
  const [pandits, setPandits] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPandits();
  }, []);

  const fetchPandits = async () => {
    try {
      setLoading(true);
      const res = await getAdminAllPandits();
      setPandits(res.data?.data || []);
    } catch (err) {
      toast.error("Error loading pandits");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updatePanditStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      fetchPandits();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pandit?")) return;
    try {
      await deletePandit(id);
      toast.success("Deleted successfully");
      fetchPandits();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const filteredPandits =
    filter === "all" ? pandits : pandits.filter((p) => p.status === filter);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-[#4A1C1C] mb-6">Manage Pandits</h2>

      {/* Filter buttons */}
      <div className="mb-6 flex gap-4">
        {["all", "approved", "pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === status
                ? "bg-[#4A1C1C] text-white"
                : "bg-white border text-[#4A1C1C]"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-[#4A1C1C] text-lg">Loading pandits...</p>
      ) : filteredPandits.length === 0 ? (
        <p className="text-center text-gray-500">No pandits found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPandits.map((pandit) => (
            <div
              key={pandit._id}
              className="border p-4 rounded-xl shadow-sm bg-white"
            >
              <img
                src={pandit.imageUrl}
                alt={pandit.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold text-[#4A1C1C]">
                {pandit.name}
              </h3>
              <p className="text-sm text-gray-700">
                {pandit.expertise} - {pandit.experience}
              </p>
              <p className="text-sm text-gray-600">Location: {pandit.location}</p>
              <p className="text-xs mt-1 text-blue-600 font-medium">
                Status: {pandit.status}
              </p>

              <div className="flex justify-between mt-4 text-sm">
                {pandit.status !== "approved" && (
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => handleStatusChange(pandit._id, "approved")}
                  >
                    Approve
                  </button>
                )}
                {pandit.status !== "pending" && (
                  <button
                    className="bg-yellow-600 text-white px-2 py-1 rounded"
                    onClick={() => handleStatusChange(pandit._id, "pending")}
                  >
                    Set Pending
                  </button>
                )}
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(pandit._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePandits;
