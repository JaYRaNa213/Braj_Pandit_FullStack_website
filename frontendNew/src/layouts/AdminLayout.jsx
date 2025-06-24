// src/layouts/AdminLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:underline">Dashboard</Link>
          <Link to="/admin/manage-blogs" className="block hover:underline">Manage Blogs</Link>
          <Link to="/admin/manage-products" className="block hover:underline">Manage Products</Link>
          <Link to="/admin/puja/bookings" className="block hover:underline">Manage Puja Bookings</Link>
          {/* Add these inside the <nav> in AdminLayout.jsx */}
<Link to="/admin/add-pandit" className="block hover:underline">Add Pandit</Link>
<Link to="/admin/manage-pandits" className="block hover:underline">Manage Pandits</Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
