//  Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// File: frontendNew/src/services/admin/liveBhajanService.js

import axiosInstance from "../axios";

/**
 * -----------------------------
 * 💼 ADMIN LIVE BHAJAN SERVICES
 * -----------------------------
 * This service file provides functions to:
 * - Manage live or recorded bhajan videos
 */
//ADMIN
export const getAllAdminLiveBhajans = () => axiosInstance.get("/admin/live");
export const addLiveBhajan = (data) => axiosInstance.post("/admin/live", data);
export const deleteLiveBhajan = (id) =>
  axiosInstance.delete(`/admin/live/${id}`);
