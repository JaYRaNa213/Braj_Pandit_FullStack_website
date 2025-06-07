// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/user/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Blog from "../pages/user/Blog";
import Products from "../pages/user/Products";
import Booking from "../pages/user/Booking";
import PujaBooking from "../pages/user/PujaBooking";
import Cart from "../pages/user/Cart";
import UserProfile from "../pages/user/UserProfile";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/products" element={<Products />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/puja-booking" element={<PujaBooking />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin Routes handled separately */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
