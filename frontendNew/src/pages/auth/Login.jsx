import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", form);
      const { token, user } = res.data || {};
if (!token || !user) {
  toast.error("Invalid response from server.");
  setLoading(false);
  return;
}

toast.success("Login successful!");
login(token); // ✅ use token now
navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message ||
          "Invalid credentials or server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-[#4A1C1C] text-white px-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p>Log in to continue your spiritual journey with BrajPandit.</p>
        </div>
      </div>

      {/* Right Side (Login Card) */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-l-[50px] shadow-xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#4A1C1C] mb-6">
            Login Here
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A1C1C]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A1C1C]"
            />
            <div className="text-right">
              <button
                type="submit"
                className="bg-[#4A1C1C] text-white px-6 py-2 rounded-full hover:bg-[#351111] transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-[#4A1C1C] underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}