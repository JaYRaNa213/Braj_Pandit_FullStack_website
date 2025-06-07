import axios from "axios";

const API_BASE = "/api/admin"; // adjust base URL if needed

// Get all products
export const getProducts = async () => {
  const response = await axios.get(`${API_BASE}/products`);
  return response.data;
};

// Delete a product by id
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE}/products/${id}`);
  return response.data;
};

// Get all blogs
export const getBlogs = async () => {
  const response = await axios.get(`${API_BASE}/blogs`);
  return response.data;
};

// Delete a blog by id
export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_BASE}/blogs/${id}`);
  return response.data;
};

// Get all puja bookings
export const getPujaBookings = async () => {
  const response = await axios.get(`${API_BASE}/puja-bookings`);
  return response.data;
};

// Delete a puja booking by id
export const deletePujaBooking = async (id) => {
  const response = await axios.delete(`${API_BASE}/puja-bookings/${id}`);
  return response.data;
};
