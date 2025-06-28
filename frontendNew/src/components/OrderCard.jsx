// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React from "react";
import { useNavigate } from "react-router-dom";
import { userCancelOrder } from "../services/orderService";
import { toast } from "react-toastify";

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Confirmed: "bg-blue-200 text-blue-800",
  Shipped: "bg-purple-200 text-purple-800",
  Delivered: "bg-green-200 text-green-800",
  Cancelled: "bg-red-200 text-red-800",
};

const OrderCard = ({ order, onCancelSuccess }) => {
  const navigate = useNavigate();

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await userCancelOrder(order._id);
      if (res.success) {
        toast.success("Order cancelled successfully.");
        onCancelSuccess?.(); // optional refetch if passed
      } else {
        toast.error(res.message || "Failed to cancel order.");
      }
    } catch (err) {
      toast.error("Something went wrong while cancelling the order.");
      console.error(err);
    }
  };

  return (
    <div className="border p-4 mb-6 rounded-lg shadow bg-white">
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => navigate(`/order/${order._id}`)}
          className="text-left font-semibold text-lg text-blue-700 hover:underline"
        >
          🧾 Order ID: {order._id}
        </button>
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            statusColors[order.status] || "bg-gray-200 text-gray-800"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {order.products?.map((p, index) => (
          <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded shadow-sm">
            <img
              src={p.productId?.imageUrl || "/default-product.png"}
              alt={p.productId?.name || "Product"}
              className="w-16 h-16 object-cover rounded border"
            />
            <div>
              <button
                className="font-medium text-blue-600 hover:underline"
                onClick={() => navigate(`/products/${p.productId?._id}`)}
              >
                {p.productId?.name || "Unknown Product"}
              </button>
              <p className="text-sm text-gray-600">Quantity: {p.quantity}</p>
              <p className="text-sm text-gray-600">Price: ₹{p.productId?.price?.toFixed(2) || "0.00"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Ordered on: {new Date(order.createdAt).toLocaleString()}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-700">
            Total: ₹{order.totalAmount?.toFixed(2)}
          </p>
          {order.status === "Pending" && (
            <button
              onClick={handleCancel}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
