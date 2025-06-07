// src/pages/admin/AdminDashboard.jsx

import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/admin/manage-blogs" className="text-blue-600 hover:underline">
              Manage Blogs
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-products" className="text-blue-600 hover:underline">
              Manage Products
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-puja-bookings" className="text-blue-600 hover:underline">
              Manage Puja Bookings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
