// src/routes/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddBlogPost from "../pages/admin/AddBlogPost";
import ManageBlogs from "../pages/admin/ManagesBlogs";
import EditBlogPost from "../pages/admin/EditBlogPost";
import NotFound from "../pages/NotFound";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={<ProtectedRoute roles={["admin"]}><AdminLayout /></ProtectedRoute>}
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="add-blog" element={<AddBlogPost />} />
        <Route path="manage-blogs" element={<ManageBlogs />} />
        <Route path="edit-blog/:id" element={<EditBlogPost />} />
      </Route>

      {/* Admin-specific fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
