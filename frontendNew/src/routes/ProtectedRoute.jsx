import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ roles = [] }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    // Role not authorized, redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  // Authorized, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
