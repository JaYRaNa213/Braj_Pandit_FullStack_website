// src/pages/user/MyOrders.jsx

import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/orders/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data?.data || []);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-100 to-pink-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-center text-pink-700 mb-8">
          🧾 My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-300 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 shadow"
              >
                <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                  📦 {order.productName}
                </h2>
                <p className="text-sm text-gray-600">
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Price:</strong> ₹{order.totalPrice}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-medium ${
                      order.status === "delivered"
                        ? "text-green-600"
                        : order.status === "cancelled"
                        ? "text-red-600"
                        : "text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
