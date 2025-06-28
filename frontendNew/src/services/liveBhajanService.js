// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import axiosInstance from "./axios";

export const getLiveBhajans = async () => {
  const res = await axiosInstance.get("/user/live-bhajans");
  return res.data;
};
