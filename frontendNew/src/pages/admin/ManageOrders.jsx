//src/pages/admin/ManageOrders.jsx

import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/admin/adminService';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data || []);
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

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders(); // refresh after update
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[#4A1C1C]">Manage Orders</h2>

      {error && <div className="text-red-600">{error}</div>}
      {loading ? (
        <div>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-600">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border-b">User</th>
                <th className="p-3 border-b">Products</th>
                <th className="p-3 border-b">Total</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Change</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{order.user?.name || 'N/A'}</td>
                  <td className="p-3 border-b text-sm">
  {Array.isArray(order.products)
    ? order.products.map(p => `${p.productId?.name || 'N/A'} x${p.quantity}`).join(', ')
    : 'No products'}
</td>
                  <td className="p-3 border-b">₹{order.totalAmount}</td>
                  <td className="p-3 border-b capitalize">{order.status}</td>
                  <td className="p-3 border-b">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border p-1 rounded"
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
