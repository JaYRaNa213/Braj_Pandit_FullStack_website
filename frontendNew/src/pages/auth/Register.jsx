import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
      console.error("Register error:", err.response?.data || err.message);
      toast.error("Failed to register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-[#4A1C1C] text-white px-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Join Us</h1>
          <p className="mb-6">
            Subscribe to BrajPandit platform to access Puja Services, Blogs, and more.
          </p>
          <button className="bg-white text-[#4A1C1C] px-5 py-2 rounded-full font-medium hover:bg-[#f2d3d3] transition">
            About Us
          </button>
        </div>
      </div>

      {/* Right Section (Form Card) */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-l-[50px] shadow-xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#4A1C1C] mb-6">
            Register Here
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A1C1C]"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A1C1C]"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A1C1C]"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="bg-[#4A1C1C] text-white px-6 py-2 rounded-full hover:bg-[#351111] transition"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#4A1C1C] underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
