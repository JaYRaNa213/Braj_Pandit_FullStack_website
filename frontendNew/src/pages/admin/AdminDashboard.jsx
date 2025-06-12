// src/pages/admin/AdminDashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, FileText, ShoppingCart, CalendarCheck, Users, Plus, LogOut } from "lucide-react";

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

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#4A1C1C] mb-10">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {adminLinks.map((link) => (
            <Link
              to={link.path}
              key={link.label}
              className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition duration-300 border-l-4 border-[#4A1C1C]"
            >
              {link.icon}
              <span className="text-lg font-medium text-[#4A1C1C]">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
