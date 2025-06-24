// src/services/admin/panditService.js
import axiosInstance from "../axios";

export const getAdminAllPandits = async () => {
  const res = await axiosInstance.get("/admin/pandits");
  return res.data;
};

export const addPandit = async (data) => {
  const res = await axiosInstance.post("/admin/pandits", data);
  return res.data;
};

export const updatePanditStatus = async (id, status) => {
  const res = await axiosInstance.patch(`/admin/pandits/${id}/status`, { status });
  return res.data;
};

export const deletePandit = async (id) => {
  const res = await axiosInstance.delete(`/admin/pandits/${id}`);
  return res.data;
};
