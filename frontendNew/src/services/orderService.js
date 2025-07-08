// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import axiosInstance from "./axios";

// ===============================
// 🔹 USER ORDER SERVICES
// ===============================

// ✅ Place an order
// ✅ Place an order
export const placeOrder = async (orderData) => {
  const res = await axiosInstance.post("/user/orders", orderData); // <-- fixed here
  return res.data;
};


// ✅ Get logged-in user's orders
export const getMyOrders = async () => {
  const res = await axiosInstance.get("/user/orders/my");
  return res.data;
};

// ✅ Get a single user order
export const getOrderById = async (id) => {
  const res = await axiosInstance.get(`/user/orders/${id}`);
  return res.data;
};

// ✅ Cancel an order (user)
export const userCancelOrder = (orderId) => {
  return axiosInstance.put(`/user/orders/${orderId}/cancel`).then((res) => res.data);
};

// ===============================
// 🔸 ADMIN ORDER SERVICES
// ===============================

// ✅ Get all orders (admin)
export const getAllOrders = async () => {
  const res = await axiosInstance.get("/admin/orders");
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
