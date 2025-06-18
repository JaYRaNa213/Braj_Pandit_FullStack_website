import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";

// User Pages
import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import Blog from "../pages/user/Blog";
import Booking from "../pages/user/Booking";
import PujaBooking from "../pages/user/PujaBooking";
import Cart from "../pages/user/Cart";
import UserProfile from "../pages/user/UserProfile";
import UserDashboard from "../pages/user/UserDashboard";
import MyOrders from "../pages/user/MyOrders";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/user/ProductDetails";
import Checkout from '../pages/user/Checkout';
import OrderDetails from '../pages/user/OrderDetails';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Protected Pages */}
        <Route element={<ProtectedRoute roles={["user", "admin"]} />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/puja/booking" element={<PujaBooking />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/my-orders" element={<MyOrders />} /> {/* ✅ Secured */}

          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="checkout" element={<Checkout />} />


        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
