// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/services/user/panditService.js
import axiosInstance from "../axios";

export const getAllPandits = async () => {
  const res = await axiosInstance.get("/user/pandits");
  return res.data;
};

export const getPanditById = async (id) => {
  return await axiosInstance.get(`/user/pandits/${id}`);
};