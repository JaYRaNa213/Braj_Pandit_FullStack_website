// frontendNew/src/services/user/live.Services.js

import axiosInstance from "../axios";

// For Home Page
export const getLiveHome = () => axiosInstance.get("/live/home");

// For All Bhajans Page
export const getLiveAll = () => axiosInstance.get("/live/all");
