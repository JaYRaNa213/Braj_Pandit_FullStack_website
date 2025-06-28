// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getAdminOrderById,
  updateOrderStatus,
} from '../../services/orderService';

const OrderDetailsAdmin = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    const res = await getAdminOrderById(id);
    if (res.success) setOrder(res.order);
  };

  const handleStatusUpdate = async (e) => {
    const status = e.target.value;
    await updateOrderStatus(id, status);
    fetchOrder(); // refresh data
  };

  if (!order) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-red-700 mb-4">📋 Admin Order Details</h2>

      <div className="mb-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>User:</strong> {order.user?.name || 'Unknown'}</p>
        <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
        <p><strong>Total:</strong> ₹{order.totalAmount?.toFixed(2)}</p>
        <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p className="mt-2">
          <strong>Status:</strong>{' '}
          <select
            value={order.status}
            onChange={handleStatusUpdate}
            className="border px-2 py-1 rounded"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </p>
      </div>

      <h3 className="text-lg font-semibold mb-2">🛒 Products</h3>
      <ul className="space-y-2">
        {order.products.map((item) => (
          <li
            key={item.productId._id}
            className="flex items-center justify-between border rounded p-3"
          >
            <div>
              <p className="font-medium">{item.productId.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p>₹{item.productId.price?.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailsAdmin;
