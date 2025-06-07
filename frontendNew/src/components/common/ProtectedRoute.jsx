// src/components/common/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center">Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" />;

  return children;
}
