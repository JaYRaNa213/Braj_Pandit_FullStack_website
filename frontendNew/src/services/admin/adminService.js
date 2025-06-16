//src/services/admin/adminService.js



import axiosInstance from "../axios.js";


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

// Get all puja bookings
export const getPujaBookings = async ({ page = 1, limit = 10, search = '', sort = 'date' } = {}) => {
  const response = await axiosInstance.get('/admin/puja/bookings', {
    params: { page, limit, search, sort },
  });
  return response.data;
};


// Delete a puja booking by id
export const deletePujaBooking = async (id) => {
  const response = await axiosInstance.delete(`/admin/puja/bookings/${id}`);
  return response.data;
};
export const getAllUsers = () => axios.get("/admin/users");
export const updateUser = (id, data) => axios.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`/admin/users/${id}`);


// Admin Dashboard Summary
export const getAdminDashboardSummary = () =>
  axiosInstance.get('/admin/dashboard/summary');