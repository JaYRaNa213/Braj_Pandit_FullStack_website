// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import Navbar from "../../components/common/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      toast.warn(i18n.language === "hi" ? "कृपया सभी फ़ील्ड भरें" : "Please fill in all fields");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.warn(i18n.language === "hi" ? "सही ईमेल पता दर्ज करें" : "Enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      toast.warn(i18n.language === "hi" ? "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए" : "Password must be at least 6 characters");
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
      toast.success(i18n.language === "hi" ? "रजिस्ट्रेशन सफल हुआ!" : "Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(i18n.language === "hi" ? "रजिस्ट्रेशन विफल रहा, पुनः प्रयास करें।" : "Failed to register. Try again.");
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
              {t("register.title")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder={t("register.name")}
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <input
                type="email"
                name="email"
                placeholder={t("register.email")}
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("register.password")}
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
                {loading ? t("register.registering") : t("register.button")}
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
              {t("register.already")}{" "}
              <Link to="/login" className="text-yellow-700 hover:underline font-medium">
                {t("register.loginHere")}
              </Link>
            </p>

            {/* Language Switcher */}
            <div className="text-center mt-6">
              <button
                onClick={() =>
                  i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")
                }
                className="text-sm text-blue-600 hover:underline"
              >
                {i18n.language === "en" ? "हिंदी में देखें" : "View in English"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
