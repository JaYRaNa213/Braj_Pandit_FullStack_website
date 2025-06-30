// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { getAdminDashboardSummary } from "../../services/admin/adminService";
import OrderStatusChart from "@/components/OrderStatusChart";

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
  { label: "Manage Blogs", icon: <FileText className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/manage-blogs" },
  { label: "Manage Products", icon: <ShoppingCart className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/manage-products" },
  { label: "Manage Puja Bookings", icon: <CalendarCheck className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/manage-bookings" },
  { label: "Manage Users", icon: <Users className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/users" },
  { label: "All Orders", icon: <LayoutDashboard className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/orders" },
  { label: "Add Blog", icon: <Plus className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/add-blog" },
  { label: "Add Product", icon: <Plus className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/add-product" },
  { label: "Add Pandit", icon: <Plus className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/add-pandit" },
  { label: "Manage Pandits", icon: <BookOpenCheck className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/manage-pandits" },
];

const statCardsConfig = [
  { label: "Total Users", key: "totalUsers", icon: <User className="text-blue-600 w-6 h-6" /> },
  { label: "Total Bookings", key: "totalBookings", icon: <CalendarCheck className="text-indigo-600 w-6 h-6" /> },
  { label: "Total Blogs", key: "totalBlogs", icon: <FileText className="text-green-600 w-6 h-6" /> },
  { label: "Total Products", key: "totalProducts", icon: <PackageSearch className="text-yellow-600 w-6 h-6" /> },
  { label: "Total Orders", key: "totalOrders", icon: <ClipboardList className="text-pink-600 w-6 h-6" /> },
  { label: "Total Pandits", key: "totalPandits", icon: <BookOpenCheck className="text-orange-600 w-6 h-6" /> },
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
      <div className="min-h-screen flex items-center justify-center text-[#4A1C1C] text-xl animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf0] to-[#f5f5f5] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-[#4A1C1C] mb-12 tracking-tight">
          Admin Control Center
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {statCardsConfig.map((card) => (
            <div
              key={card.label}
              className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-[#4A1C1C] hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center gap-4">
                {card.icon}
                <div>
                  <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                  <h2 className="text-3xl font-bold text-[#4A1C1C]">
                    {totals[card.key] ?? 0}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-[#4A1C1C]">
              Weekly Booking Overview
            </h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
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
              <div className="text-center text-gray-500">No booking data available.</div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-[#4A1C1C]">
              Order Status Summary
            </h2>
            <OrderStatusChart data={totals} />
          </div>
        </div>

        {/* Admin Quick Action Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {adminLinks.map((link) => (
            <Link
              to={link.path}
              key={link.label}
              className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#f7f2ec] border-l-4 border-[#4A1C1C] transition duration-300"
            >
              {link.icon}
              <span className="text-lg font-semibold text-[#4A1C1C]">
                {link.label}
              </span>
            </Link>
          ))}

          {/* Add Live Channel */}
          <Link
            to="/admin/add-live-bhajan"
            className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#f7f2ec] border-l-4 border-[#4A1C1C] transition duration-300"
          >
            <Plus className="w-5 h-5 text-[#4A1C1C]" />
            <span className="text-lg font-semibold text-[#4A1C1C]">
              Add Live Channel
            </span>
          </Link>

          {/* Manage Live Bhajans */}
          <Link
            to="/admin/manage-live-bhajans"
            className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#f7f2ec] border-l-4 border-[#4A1C1C] transition duration-300"
          >
            <Video className="w-5 h-5 text-[#4A1C1C]" />
            <span className="text-lg font-semibold text-[#4A1C1C]">
              Manage Live Bhajans
            </span>
          </Link>
        </div>

        {/* Logout */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 px-5 py-3 border border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
