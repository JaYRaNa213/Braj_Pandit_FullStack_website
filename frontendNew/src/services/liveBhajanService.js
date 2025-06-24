import axiosInstance from "./axios";

export const getLiveBhajans = async () => {
  const res = await axiosInstance.get("/user/live-bhajans");
  return res.data;
};
