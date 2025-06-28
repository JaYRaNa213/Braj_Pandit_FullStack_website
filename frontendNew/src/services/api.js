// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/services/api.js
import axiosInstance from "./axios";

// =================== AUTH ===================
export const getUser = () => axiosInstance.get("/auth/user");
export const login = (credentials) => axiosInstance.post("/auth/login", credentials);
export const register = (userData) => axiosInstance.post("/auth/register", userData);

// =================== BLOGS ===================
export const getBlogs = () => axiosInstance.get("/blogs");
export const getBlogById = (id) => axiosInstance.get(`/blogs/${id}`);
export const createBlog = (blogData) => axiosInstance.post("/blogs", blogData);
export const updateBlog = (id, blogData) => axiosInstance.put(`/blogs/${id}`, blogData);
export const deleteBlog = (id) => axiosInstance.delete(`/blogs/${id}`);

// =================== COMMENTS ===================
export const getComments = (blogId) => axiosInstance.get(`/blogs/${blogId}/comments`);

// =================== PRODUCTS ===================
// USER (public)
export const getProducts = () => axiosInstance.get("/products");

// ADMIN
export const getAllAdminProducts = () => axiosInstance.get("/admin/products");
export const deleteProduct = (id) => axiosInstance.delete(`/admin/products/${id}`);
export const addProduct = (formData) =>
  axiosInstance.post("/admin/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id, formData) =>
  axiosInstance.put(`/admin/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// =================== BOOKINGS ===================
export const bookPuja = (bookingData) => axiosInstance.post("/bookings", bookingData);
export const getPujaBookings = () => axiosInstance.get("/bookings");

// =================== EXPORT ===================
export default {
  getUser,
  login,
  register,
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getComments,
  getProducts,
  getAllAdminProducts,
  deleteProduct,
  addProduct,
  updateProduct,
  bookPuja,
  getPujaBookings,
};
