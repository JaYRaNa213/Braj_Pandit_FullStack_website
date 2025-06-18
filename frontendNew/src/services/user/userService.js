import axios from "axios";
import axiosInstance from "../axios.js";
import { AUTH, USER, BOOKING, PAYMENT } from "../../constants/apiRoutes.js";
import { toast } from 'react-toastify';

// ✅ Public Routes (No Auth Required)
const register = async (userData) => {
  const response = await axios.post(AUTH.REGISTER, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(AUTH.LOGIN, credentials);
  return response.data;
};

// ✅ Authenticated Routes (use axiosInstance with token automatically attached)
const logout = async () => {
  const response = await axiosInstance.post(AUTH.LOGOUT);
  return response.data;
};

const getProfile = async () => {
  const response = await axiosInstance.get(USER.PROFILE);
  return response.data;
};

const updateProfile = async (updatedData) => {
  const response = await axiosInstance.put(USER.UPDATE_PROFILE, updatedData);
  return response.data;
};

const getBookings = async () => {
  const response = await axiosInstance.get(BOOKING.LIST);
  return response.data;
};

const addBooking = async (bookingData) => {
  const response = await axiosInstance.post(BOOKING.ADD, bookingData);
  return response.data;
};

const updateBooking = async (id, updatedData) => {
  const response = await axiosInstance.put(BOOKING.UPDATE(id), updatedData);
  return response.data;
};

const deleteBooking = async (id) => {
  const response = await axiosInstance.delete(BOOKING.DELETE(id));
  return response.data;
};

const createPayment = async (paymentData) => {
  const response = await axiosInstance.post(PAYMENT.CREATE, paymentData);
  return response.data;
};

const getPaymentStatus = async (paymentId) => {
  const response = await axiosInstance.get(PAYMENT.STATUS(paymentId));
  return response.data;
};

const uploadProfileImage = async (formData) => {
  const response = await axiosInstance.post(USER.UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// const placeOrder = (data) => axiosInstance.post("api/orders", data);
// const getMyOrders = () => axiosInstance.get("api/orders/my");



export const placeOrder = async (data) => {
  try {
    const res = await axiosInstance.post('/api/orders', data);
    toast.success('Order placed successfully');
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Order placement failed');
    throw err;
  }
};

export const getMyOrders = async () => {
  try {
    const res = await axiosInstance.get('/api/orders/my');
    return res.data.orders;
  } catch (err) {
    toast.error('Failed to load your orders');
    return [];
  }
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
  uploadProfileImage,
  placeOrder,
  getMyOrders
};
