import axiosInstance from "../axios";

export const getAllPandits = async () => {
  const res = await axiosInstance.get("/user/pandits");
  return res.data;
};

export const getPanditById = async (id) => {
  return await axiosInstance.get(`/user/pandits/${id}`);
};

export const applyAsPandit = (data) =>
  axiosInstance.post("/user/pandits/apply", data);

export const getApprovedPandits = () =>
  axiosInstance.get("/user/pandits");
