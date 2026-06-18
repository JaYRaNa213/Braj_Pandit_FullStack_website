// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

//src/services/admin/adminService.js



import axiosInstance from "../axios.js";
import{ toast } from 'react-toastify';

// Get all products
export const addProduct = (productData) =>
  axiosInstance.post('/admin/products', productData);

export const getAllAdminProducts = () =>
  axiosInstance.get('/admin/products');

export const deleteProduct = (id) =>
  axiosInstance.delete(`/admin/products/${id}`);

export const updateProduct = (id, productData) =>
  axiosInstance.put(`/admin/products/${id}`, productData);


// Get all blogs
// Admin Blogs
export const getBlogs = async () => {
  const response = await axiosInstance.get('/admin/blogs');
  return response.data.data || response.data;
};

export const deleteBlog = async (id) => {
  const response = await axiosInstance.delete(`/admin/blogs/${id}`);
  return response.data;
};



export const getAllUsers = () => axios.get("/admin/users");
export const updateUser = (id, data) => axios.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`/admin/users/${id}`);


// Admin Dashboard Summary
export const getAdminDashboardSummary = () =>
  axiosInstance.get('/admin/dashboard/summary');

export const getPujaBookings = async ({ page, limit, search, sort }) => {
  const response = await axiosInstance.get("/admin/puja/bookings", {
    params: { page, limit, search, sort },
  });
  return response.data;
};

export const deletePujaBooking = async (id) => {
  const response = await axiosInstance.delete(`/admin/puja/bookings/${id}`);
  return response.data;
};

export const updatePujaBookingStatus = async (id, status) => {
  const res = await axiosInstance.put(`/admin/puja/bookings/${id}/status`, { status });
  return res.data;
};


export const getOrderById = (id) => axiosInstance.get(`/admin/orders/${id}`);



export const getAllOrders = async () => {
  try {
    const res = await axiosInstance.get('/admin/orders');
    return res.data.orders;
  } catch (err) {
    toast.error('Error fetching all orders');
    return [];
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    await axiosInstance.put(`/admin/orders/${id}/status`, { status });
    toast.success(`Order status updated to ${status}`);
  } catch (err) {
    toast.error('Failed to update order status');
    throw err;
  }
};

export const cancelOrder = async (id) => {
  try {
    await axiosInstance.put(`/admin/orders/${id}/cancel`);
    toast.success('Order cancelled');
  } catch (err) {
    toast.error('Failed to cancel order');
    throw err;
  }
};



export const getAllPayments = () => axiosInstance.get("/admin/payments");
export const getPaymentById = (id) => axiosInstance.get(`/admin/payments/${id}`);
