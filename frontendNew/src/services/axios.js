// 🔐 Developed by Jay Rana © 2025
import axios from "axios";
import i18n from "i18next"; // ✅ Required for detecting current language

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:7000/api";

const axiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Add Accept-Language header for multilingual support
    config.headers["Accept-Language"] = i18n.language || "en";

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
