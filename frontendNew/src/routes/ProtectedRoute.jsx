// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ roles = [] }) => {
  const { user } = useAuth();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user doesn't have the correct role
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />; // or create /unauthorized page
  }

  return <Outlet />;
};

export default ProtectedRoute;
