// src/services/orderService.js
import axiosInstance from "./axios";

// ===============================
// 🔹 USER ORDER SERVICES
// ===============================

// ✅ Place an order
export const placeOrder = async (orderData) => {
  const res = await axiosInstance.post("/orders", orderData);
  return res.data;
};

// ✅ Get logged-in user's orders
export const getMyOrders = async () => {
  const res = await axiosInstance.get("/orders/my");
  return res.data;
};

// ✅ Get a single user order
export const getOrderById = async (id) => {
  const res = await axiosInstance.get(`/orders/${id}`);
  return res.data;
};

export const userCancelOrder = (orderId) => {
  return axiosInstance.put(`/orders/${orderId}/cancel`).then(res => res.data);
};

// ===============================
// 🔸 ADMIN ORDER SERVICES
// ===============================

// ✅ Get all orders (admin)
export const getAllOrders = async () => {
  const res = await axiosInstance.get("/admin/orders"); // ✅ baseURL = /api
  return res.data;
};

// ✅ Get single order by ID (admin)
export const getAdminOrderById = async (id) => {
  const res = await axiosInstance.get(`/admin/orders/${id}`);
  return res.data;
};

// ✅ Update order status (admin)
export const updateOrderStatus = async (id, status) => {
  const res = await axiosInstance.put(`/admin/orders/${id}/status`, { status });
  return res.data;
};

// ✅ Cancel/refuse order (admin)
export const cancelOrder = async (id) => {
  const res = await axiosInstance.put(`/admin/orders/${id}/cancel`);
  return res.data;
};
