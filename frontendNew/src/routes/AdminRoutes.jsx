import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddBlogPost from "../pages/admin/AddBlogPost";
import ManageBlogs from "../pages/admin/ManagesBlogs";
import EditBlogPost from "../pages/admin/EditBlogPost";
import ManageProducts from "../pages/admin/ManageProducts";
import AddProduct from "../pages/admin/AddProduct";
import NotFound from "../pages/NotFound";

import ManagePujaBookings from "../pages/admin/ManagePujaBookings";
import UserList from "../pages/admin/UserList";

import ManageOrders from '../pages/admin/ManageOrders';
import OrderDetailsAdmin from '../pages/admin/OrderDetailsAdmin';



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

      </Route>

      {/* Admin-specific fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;