// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddBlogPost from "../pages/admin/AddBlogPost";
import ManageBlogs from "../pages/admin/ManageBlogs";
import EditBlogPost from "../pages/admin/EditBlogPost";
import ManageProducts from "../pages/admin/ManageProducts";
import AddProduct from "../pages/admin/AddProduct";
import NotFound from "../pages/NotFound";

import ManagePujaBookings from "../pages/admin/ManagePujaBookings";
import UserList from "../pages/admin/UserList";

import ManageOrders from '../pages/admin/ManageOrders';
import OrderDetailsAdmin from '../pages/admin/OrderDetailsAdmin';

import AdminAddPandit from "../pages/admin/AdminAddPandit";
import ManagePandits from "../pages/admin/ManagePandits";

import ManageLiveBhajans from "../pages/admin/ManageLiveBhajans";




// import PujaBookings from "../pages/user/PujaBookings";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route
  element={
    <ProtectedRoute allowedRoles={["admin"]}>   {/* ✅ fixed */}
      <AdminLayout />
    </ProtectedRoute>
  }
>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route index element={<AdminDashboard />} />

        <Route path="add-blog" element={<AddBlogPost />} />
        <Route path="manage-blogs" element={<ManageBlogs />} />
        <Route path="edit-blog/:id" element={<EditBlogPost />} />
        {/* Product Management Routes */}
        <Route path="manage-products" element={<ManageProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="orders/:id" element={<OrderDetailsAdmin />} />

        <Route path="users" element={<UserList />} />


        <Route path="puja/bookings" element={<ManagePujaBookings />} />
        <Route path="manage-bookings" element={<ManagePujaBookings />} />

        <Route path="add-pandit" element={<AdminAddPandit />} />
<Route path="manage-pandits" element={<ManagePandits />} />

<Route path="manage-live-bhajans" element={<ManageLiveBhajans />} />








      </Route>

      {/* Admin-specific fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;