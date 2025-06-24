// src/services/api.js
import axiosInstance from "./axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api/";

const api = axiosInstance.create({
  baseURL: API_BASE_URL,
});

// ✅ Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// =================== AUTH ===================
export const getUser = () => api.get("/auth/user");
export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (userData) => api.post("/auth/register", userData);

// =================== BLOGS ===================
export const getBlogs = () => api.get("/blogs");
export const getBlogById = (id) => api.get(`/blogs/${id}`);
export const createBlog = (blogData) => api.post("/blogs", blogData);
export const updateBlog = (id, blogData) => api.put(`/blogs/${id}`, blogData);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// =================== COMMENTS ===================
export const getComments = (blogId) => api.get(`/blogs/${blogId}/comments`);

// =================== PRODUCTS ===================
// USER (public)
export const getProducts = () => api.get("/products");

// ADMIN
export const getAllAdminProducts = () => api.get("/admin/products");
export const deleteProduct = (id) => api.delete(`/admin/products/${id}`);
export const addProduct = (formData) =>
  api.post("/admin/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id, formData) =>
  api.put(`/admin/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// =================== BOOKINGS ===================
export const bookPuja = (bookingData) => api.post("/bookings", bookingData);
export const getPujaBookings = () => api.get("/bookings");

// =================== EXPORT DEFAULT ===================
export default api;
