// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { getAdminDashboardSummary } from "../../services/admin/adminService";
import OrderStatusChart from "@/components/OrderStatusChart";
import Navbar from "../../components/common/Navbar";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  CalendarCheck,
  Users,
  Plus,
  PackageSearch,
  User,
  ClipboardList,
  BookOpenCheck,
  LogOut,
  Video,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const adminLinks = [
  { label: "Manage Blogs", icon: <FileText className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />, path: "/admin/manage-blogs" },
  { label: "Manage Products", icon: <ShoppingCart className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />, path: "/admin/manage-products" },
  { label: "Manage Puja Bookings", icon: <CalendarCheck className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />, path: "/admin/manage-bookings" },
  { label: "Manage Users", icon: <Users className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />, path: "/admin/users" },
  { label: "All Orders", icon: <LayoutDashboard className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />, path: "/admin/orders" },
  { label: "Add Blog", icon: <Plus className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />, path: "/admin/add-blog" },
  { label: "Add Product", icon: <Plus className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />, path: "/admin/add-product" },
  { label: "Add Pandit", icon: <Plus className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />, path: "/admin/add-pandit" },
  { label: "Manage Pandits", icon: <BookOpenCheck className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />, path: "/admin/manage-pandits" },
];

const statCardsConfig = [
  { label: "Total Users", key: "totalUsers", icon: <User className="text-blue-600 dark:text-blue-400 w-6 h-6" /> },
  { label: "Total Bookings", key: "totalBookings", icon: <CalendarCheck className="text-indigo-600 dark:text-indigo-400 w-6 h-6" /> },
  { label: "Total Blogs", key: "totalBlogs", icon: <FileText className="text-green-600 dark:text-green-400 w-6 h-6" /> },
  { label: "Total Products", key: "totalProducts", icon: <PackageSearch className="text-yellow-600 dark:text-yellow-300 w-6 h-6" /> },
  { label: "Total Orders", key: "totalOrders", icon: <ClipboardList className="text-pink-600 dark:text-pink-400 w-6 h-6" /> },
  { label: "Total Pandits", key: "totalPandits", icon: <BookOpenCheck className="text-orange-600 dark:text-orange-400 w-6 h-6" /> },
];

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getAdminDashboardSummary();
        const summaryData = res.data.data || res.data;
        setSummary(summaryData);
      } catch (error) {
        console.error("Failed to load dashboard summary:", error);
        setSummary({
          totals: {
            totalUsers: 0,
            totalBlogs: 0,
            totalProducts: 0,
            totalBookings: 0,
            totalOrders: 0,
            totalPandits: 0,
          },
          chart: {
            bookingChart: [],
          },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const totals = summary?.totals || {};
  const chartData = summary?.chart?.bookingChart || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#4A1C1C] dark:text-yellow-300 text-xl animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf0] to-[#f5f5f5] dark:from-[#1a1a1a] dark:to-[#0e0e0e] p-6 text-[#4A1C1C] dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 tracking-tight">
          Admin Control Center
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {statCardsConfig.map((card) => (
            <div
              key={card.label}
              className="bg-white dark:bg-[#222] p-6 rounded-2xl shadow-xl border-l-8 border-[#4A1C1C] dark:border-yellow-500 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center gap-4">
                {card.icon}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300 font-medium">{card.label}</p>
                  <h2 className="text-3xl font-bold">{totals[card.key] ?? 0}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-[#222] rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Weekly Booking Overview</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#4A1C1C"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">No booking data available.</div>
            )}
          </div>

          <div className="bg-white dark:bg-[#222] rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Order Status Summary</h2>
            <OrderStatusChart data={totals} />
          </div>
        </div>

        {/* Admin Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {adminLinks.map((link) => (
            <Link
              to={link.path}
              key={link.label}
              className="flex items-center gap-4 bg-white dark:bg-[#222] p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#f7f2ec] dark:hover:bg-[#333] border-l-4 border-[#4A1C1C] dark:border-yellow-500 transition duration-300"
            >
              {link.icon}
              <span className="text-lg font-semibold">{link.label}</span>
            </Link>
          ))}

          <Link
            to="/admin/manage-live-bhajans"
            className="flex items-center gap-4 bg-white dark:bg-[#222] p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#f7f2ec] dark:hover:bg-[#333] border-l-4 border-[#4A1C1C] dark:border-yellow-500 transition duration-300"
          >
            <Video className="w-5 h-5 text-[#4A1C1C] dark:text-yellow-400" />
            <span className="text-lg font-semibold">Add & Manage Live Darshan's</span>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 px-5 py-3 border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 font-semibold rounded-full hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
