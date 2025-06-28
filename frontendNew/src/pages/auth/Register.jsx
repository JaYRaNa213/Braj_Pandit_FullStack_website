// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/auth/Register.jsx
// src/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import Navbar from "../../components/common/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      toast.warn("Please fill in all fields");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.warn("Enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await axios.post("/auth/register", form);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to register. Try again.");
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
            src="https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg"
            alt="Join Us"
            className="w-full h-full object-cover rounded-br-[100px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent rounded-br-[100px]" />
        </div>

        <div className="md:w-1/2 flex items-center justify-center bg-gray-100 px-6 py-12">
          <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-[#4A1C1C] mb-6">
              Create Your Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
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
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-700 hover:underline font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
