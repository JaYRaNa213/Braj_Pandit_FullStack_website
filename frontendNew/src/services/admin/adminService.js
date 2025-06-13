import axiosInstance from "axios";

const API_BASE = "/api/admin"; // Adjust base URL if needed

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
export const getBlogs = async () => {
  const response = await axiosInstance.get(`${API_BASE}/blogs`);
  return response.data.data || response.data;
};

// Delete a blog by id
export const deleteBlog = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE}/blogs/${id}`);
  return response.data;
};

// Get all puja bookings
export const getPujaBookings = async ({ page = 1, limit = 10, search = '', sort = 'date' } = {}) => {
  const response = await axiosInstance.get(`${API_BASE}/puja-bookings`, {
    params: { page, limit, search, sort },
  });
  return response.data;
};


// Delete a puja booking by id
export const deletePujaBooking = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE}/puja-bookings/${id}`);
  return response.data;
};
