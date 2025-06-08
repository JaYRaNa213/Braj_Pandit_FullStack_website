// src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api/v1";

const api = axios.create({
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
export const getBlogs = () => {
  return api.get("/blogs");  // Adjust the endpoint as per your backend API
};
export const getBlogById = (id) => {
  return api.get(`/blogs/${id}`);  // Adjust the endpoint as per your backend API
};
export const createBlog = (blogData) => {
  return api.post("/blogs", blogData);  // Adjust the endpoint as per your backend API
};
export const updateBlog = (id, blogData) => {
  return api.put(`/blogs/${id}`, blogData);  // Adjust the endpoint as per your backend API
};
export const deleteBlog = (id) => {
  return api.delete(`/blogs/${id}`);  // Adjust the endpoint as per your backend API
};
export const getComments = (blogId) => {
  return api.get(`/blogs/${blogId}/comments`);  // Adjust the endpoint as per your backend API
};
export const getProducts = () => {
  return api.get("/products");  // Adjust endpoint as per your backend API
};
export const bookPuja = (bookingData) => {
  return api.post("/booking/puja", bookingData); // adjust endpoint & payload as per your backend API
};





export default api;
