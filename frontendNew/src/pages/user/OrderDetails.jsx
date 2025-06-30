// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then((res) => {
      if (res.success) setOrder(res.order);
    });
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400 text-lg">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-2xl p-6 md:p-8 border dark:border-gray-700">
        <h2 className="text-3xl font-bold text-red-700 dark:text-yellow-400 mb-6">
          🧾 Order Summary
        </h2>

        {/* Order Info */}
        <div className="space-y-2 text-sm sm:text-base">
          <p><strong>🆔 Order ID:</strong> {order._id}</p>
          <p>
            <strong>📌 Status:</strong>{" "}
            <span className="text-blue-700 dark:text-blue-400 font-semibold">
              {order.status}
            </span>
          </p>
          <p><strong>💰 Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>
          <p><strong>🕒 Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>💳 Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>
        </div>

        {/* Products List */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">📦 Products</h3>
          <ul className="space-y-4">
            {order.products.map((item) => (
              <li
                key={item.productId?._id}
                className="flex items-center gap-4 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-600"
              >
                <img
                  src={item.productId?.imageUrl || "/default-product.png"}
                  alt={item.productId?.name}
                  className="w-16 h-16 object-cover rounded border dark:border-gray-500"
                />
                <div>
                  <p className="font-semibold">{item.productId?.name || "Unnamed Product"}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="text-sm">Price: ₹{item.productId?.price?.toFixed(2) || 0}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/my-orders")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            ← Back to My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
