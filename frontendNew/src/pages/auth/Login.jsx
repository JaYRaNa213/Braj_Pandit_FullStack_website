// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/auth/Login.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
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
        toast.error("Invalid response from server.");
        return;
      }

      toast.success("Login successful!");
      login(token);
      await fetchAndStoreProfile(token);
      await syncCartToBackend(token);

      navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="md:w-1/2 w-full h-[300px] md:h-screen relative overflow-hidden">
        <img
          src="https://res.cloudinary.com/djtq2eywl/image/upload/c_crop,ar_3:4/v1750585723/tvx69ko0uc2vsozw2loj.png"
          alt="Login Visual"
          className="w-full h-full object-cover rounded-br-[100px]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent rounded-br-[100px]" />
      </div>

      {/* Right Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100 px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-[#4A1C1C] mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-md transition duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-yellow-700 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
