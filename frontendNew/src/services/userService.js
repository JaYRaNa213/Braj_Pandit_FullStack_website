// // src/services/userService.js
// import api from "./api";

// export const getBlogs = () => api.get("/blogs");
// export const getProducts = () => api.get("/products");
// export const getBookings = () => api.get("/bookings");

// export const createBooking = (data) => api.post("/bookings", data);


import axios from "axios";
import { AUTH, USER, BOOKING, PAYMENT } from "../constants/apiRoutes";

const register = async (userData) => {
  const response = await axios.post(AUTH.REGISTER, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(AUTH.LOGIN, credentials);
  return response.data;
};

const logout = async () => {
  const response = await axios.post(AUTH.LOGOUT);
  return response.data;
};

const getProfile = async () => {
  const response = await axios.get(USER.PROFILE, { withCredentials: true });
  return response.data;
};

const updateProfile = async (updatedData) => {
  const response = await axios.put(USER.UPDATE_PROFILE, updatedData, { withCredentials: true });
  return response.data;
};

const getBookings = async () => {
  const response = await axios.get(BOOKING.LIST, { withCredentials: true });
  return response.data;
};

const addBooking = async (bookingData) => {
  const response = await axios.post(BOOKING.ADD, bookingData, { withCredentials: true });
  return response.data;
};

const updateBooking = async (id, updatedData) => {
  const response = await axios.put(BOOKING.UPDATE(id), updatedData, { withCredentials: true });
  return response.data;
};

const deleteBooking = async (id) => {
  const response = await axios.delete(BOOKING.DELETE(id), { withCredentials: true });
  return response.data;
};

const createPayment = async (paymentData) => {
  const response = await axios.post(PAYMENT.CREATE, paymentData, { withCredentials: true });
  return response.data;
};

const getPaymentStatus = async (paymentId) => {
  const response = await axios.get(PAYMENT.STATUS(paymentId), { withCredentials: true });
  return response.data;
};

export {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  getBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  createPayment,
  getPaymentStatus,
};