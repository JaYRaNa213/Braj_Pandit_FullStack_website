// src/pages/admin/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  CalendarCheck,
  Users,
  Plus,
  LogOut,
  PackageSearch,
  User,
  ClipboardList,
} from "lucide-react";
import { getAdminDashboardSummary } from "../../services/admin/adminService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 🔗 Admin Navigation Links
const adminLinks = [
  {
    label: "Manage Blogs",
    icon: <FileText className="w-5 h-5 text-[#4A1C1C]" />,
    path: "/admin/manage-blogs",
  },
  {
    label: "Manage Products",
    icon: <ShoppingCart className="w-5 h-5 text-[#4A1C1C]" />,
    path: "/admin/manage-products",
  },
  {
    label: "Manage Puja Bookings",
    icon: <CalendarCheck className="w-5 h-5 text-[#4A1C1C]" />,
    path: "/admin/manage-puja-bookings",
  },
  {
    label: "Manage Users",
    icon: <Users className="w-5 h-5 text-[#4A1C1C]" />,
    path: "/admin/manage-users",
  },
  {
    label: "All Orders",
    icon: <LayoutDashboard className="w-5 h-5 text-[#4A1C1C]" />,
    path: "/admin/orders",
  },
  {
    label: "Add Blog",
    icon: <Plus className="w-5 h-5 text-[#4A1C1C]" />,
    path: "/admin/add-blog",
  },
  {
    label: "Add Product",
    icon: <Plus className="w-5 h-5 text-[#4A1C1C]" />,
    path: "/admin/add-product",
  },
  {
    label: "Logout",
    icon: <LogOut className="w-5 h-5 text-red-600" />,
    path: "/logout",
  },
];

// 📊 Summary Statistic Card Configuration
const statCardsConfig = [
  {
    label: "Total Users",
    key: "totalUsers",
    icon: <User className="text-blue-600 w-6 h-6" />,
  },
  {
    label: "Total Bookings",
    key: "totalBookings",
    icon: <CalendarCheck className="text-indigo-600 w-6 h-6" />,
  },
  {
    label: "Total Blogs",
    key: "totalBlogs",
    icon: <FileText className="text-green-600 w-6 h-6" />,
  },
  {
    label: "Total Products",
    key: "totalProducts",
    icon: <PackageSearch className="text-yellow-600 w-6 h-6" />,
  },
  {
    label: "Total Orders",
    key: "totalOrders",
    icon: <ClipboardList className="text-pink-600 w-6 h-6" />,
  },
];

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        
        const res = await getAdminDashboardSummary();
const summaryData = res.data.data || res.data; // fallback for both cases
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

  const cardStyle =
    "flex items-center space-x-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition duration-300 border-l-4 border-[#4A1C1C]";

  const totals = summary?.totals || {};
  const chartData = summary?.chart?.bookingChart || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#4A1C1C] text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#4A1C1C] mb-10">
          Admin Dashboard
        </h1>

        {/* 📦 Stat Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {statCardsConfig.map((card) => (
            <div
              key={card.label}
              className="bg-white p-5 rounded-xl shadow border-l-4 border-[#4A1C1C] flex items-center gap-4"
            >
              {card.icon}
              <div>
                <p className="text-sm text-gray-600">{card.label}</p>
                <h2 className="text-2xl font-semibold text-[#4A1C1C]">
                  {totals[card.key] ?? 0}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* 📈 Booking Chart */}
        {chartData.length > 0 ? (
          <div className="bg-white rounded-xl shadow p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4 text-[#4A1C1C]">
              Weekly Booking Overview
            </h2>
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
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 mb-12 text-center text-gray-500">
            No weekly booking data available.
          </div>
        )}

        {/* 🔗 Admin Action Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {adminLinks.map((link) => (
            <Link to={link.path} key={link.label} className={cardStyle}>
              {link.icon}
              <span className="text-lg font-medium text-[#4A1C1C]">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
