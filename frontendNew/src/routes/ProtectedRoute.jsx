// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = (props) => {
  const { user } = useAuth();
  const roles = props.roles || []; // ✅ ensures roles is at least an empty array

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role not authorized
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;