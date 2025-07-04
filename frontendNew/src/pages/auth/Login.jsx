// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  const { t, i18n } = useTranslation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.email || !form.password) {
      toast.error(t("login.fill_all_fields"));
      return false;
    }
    return true;
  };

  const syncCartToBackend = async (token) => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    try {
      await axiosInstance.put(
        "/cart/sync",
        { cart: localCart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("❌ Cart sync failed:", err);
    }
  };

  const fetchAndStoreProfile = async (token) => {
    try {
      const res = await axiosInstance.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.error("❌ Failed to fetch user profile:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", form);
      const { token, user } = res.data;

      if (!token || !user) {
        toast.error(t("login.invalid_response"));
        return;
      }

      toast.success(t("login.success"));
      login(token);
      await fetchAndStoreProfile(token);
      await syncCartToBackend(token);

      navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || t("login.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-1/2 h-[300px] md:h-screen relative overflow-hidden">
          <img
            src="https://res.cloudinary.com/djtq2eywl/image/upload/c_crop,ar_3:4/v1750585723/tvx69ko0uc2vsozw2loj.png"
            alt="Login Visual"
            className="w-full h-full object-cover rounded-br-[100px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent rounded-br-[100px]" />
        </div>

        <div className="md:w-1/2 flex items-center justify-center bg-gray-100 px-6 py-12">
          <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-[#4A1C1C] mb-6">
              {t("login.title")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                name="email"
                placeholder={t("login.email")}
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("login.password")}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 cursor-pointer text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-md transition duration-300"
                disabled={loading}
              >
                {loading ? t("login.loading") : t("login.button")}
              </button>
            </form>
            <p className="text-sm text-center text-gray-600 mt-6">
              {t("login.no_account")}{" "}
              <Link to="/register" className="text-yellow-700 hover:underline font-medium">
                {t("login.register_here")}
              </Link>
            </p>
            <button
              onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
              className="mt-6 text-sm underline text-gray-500 hover:text-yellow-600"
            >
              {i18n.language === "en" ? "हिंदी में बदलें" : "Switch to English"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
