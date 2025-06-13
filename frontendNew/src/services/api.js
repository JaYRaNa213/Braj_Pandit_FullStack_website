// src/services/api.js
import axiosInstance from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api/";

const api = axiosInstance.create({
  baseURL: API_BASE_URL,
});

// Attach token automatically if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUser = () => api.get("/auth/user");
export const login = (credentials) => {
  return api.post("/auth/login", credentials);
};
export const register = (userData) => {
  return api.post("/auth/register", userData);
};
// ✅ BLOG
export const getBlogs = () => axiosInstance.get("/blogs");
export const getBlogById = (id) => axiosInstance.get(`/blogs/${id}`);
export const createBlog = (blogData) => axiosInstance.post("/blogs", blogData);
export const updateBlog = (id, blogData) => axiosInstance.put(`/blogs/${id}`, blogData);
export const deleteBlog = (id) => axiosInstance.delete(`/blogs/${id}`);


// ✅ COMMENTS
export const getComments = (blogId) => axiosInstance.get(`/blogs/${blogId}/comments`);

// ✅ PRODUCTS
export const getProducts = () => axiosInstance.get("/products");

// ✅ BOOKINGS
export const bookPuja = (bookingData) => {
  const token = localStorage.getItem("accessToken");
  return api.post("/bookings", bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPujaBookings = () => axiosInstance.get("/bookings");

export default axiosInstance;
