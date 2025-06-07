import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Route groups
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

// Not Found fallback
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin & User Routes */}
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Fallback Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
};

export default AppRoutes;
