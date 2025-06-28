// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/admin/adminService';
import { CSVLink } from 'react-csv';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState('date');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data || []);
      setFilteredOrders(data || []);
    } catch (err) {
      console.error("Failed to load orders", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = [...orders];
    if (search) {
      filtered = filtered.filter((order) =>
        order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        order.products.some((p) =>
          p.productId?.name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    if (sortKey === 'total') {
      filtered.sort((a, b) => b.totalAmount - a.totalAmount);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFilteredOrders(filtered);
  }, [search, statusFilter, sortKey, orders]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update order status.");
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "pending":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "confirmed":
        return `${base} bg-blue-100 text-blue-700`;
      case "shipped":
        return `${base} bg-purple-100 text-purple-700`;
      case "delivered":
        return `${base} bg-green-100 text-green-700`;
      case "cancelled":
      case "refused":
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  const headers = [
    { label: "User", key: "user.name" },
    { label: "Products", key: "productsString" },
    { label: "Total", key: "totalAmount" },
    { label: "Status", key: "status" }
  ];

  const csvData = filteredOrders.map((order) => ({
    user: order.user?.name || 'N/A',
    productsString: order.products.map(p => `${p.productId?.name} x${p.quantity}`).join(', '),
    totalAmount: order.totalAmount,
    status: order.status
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-red-700">Manage Orders</h2>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by user or product"
          className="border border-gray-300 p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="refused">Refused</option>
        </select>

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="total">Sort by Total</option>
        </select>

        <CSVLink
          data={csvData}
          headers={headers}
          filename="orders.csv"
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
        >
          Export CSV
        </CSVLink>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-gray-600">No orders found.</div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border-b">User</th>
                <th className="p-3 border-b">Products</th>
                <th className="p-3 border-b">Total</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{order.user?.name || "N/A"}</td>
                  <td className="p-3 border-b text-sm">
                    {order.products
                      .map((p) => `${p.productId?.name || "Unknown"} x${p.quantity}`)
                      .join(", ")}
                  </td>
                  <td className="p-3 border-b font-medium">₹{order.totalAmount}</td>
                  <td className="p-3 border-b">
                    <span className={getStatusBadge(order.status)}>{order.status}</span>
                  </td>
                  <td className="p-3 border-b">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border border-gray-300 p-1 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refused">Refused</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
