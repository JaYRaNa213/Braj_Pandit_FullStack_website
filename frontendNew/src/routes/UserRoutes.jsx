// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.






// frontendNew/src/routes/UserRoutes.jsx


import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";

// User Pages
import Home from "../pages/user/home/Home.jsx";
import Products from "../pages/user/Products";
import Blog from "../pages/user/Blog";
import Booking from "../pages/user/Booking";
import PujaBooking from "../pages/user/PujaBooking";
import Cart from "../pages/user/CartPage";
import UserProfile from "../pages/user/UserProfile";
import UserDashboard from "../pages/user/UserDashboard.jsx";
import MyOrders from "../pages/user/MyOrders";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/user/ProductDetails";
import Checkout from "../pages/user/Checkout";
import OrderDetails from "../pages/user/OrderDetails";
import CancelSuccess from "../pages/user/CancelSuccess";

import BlogDetails from "../pages/user/BlogDetails";

import PanditDetails from "../pages/user/PanditDetails";

import AllPandits from '../pages/user/AllPandits';

import AllPujaServices from '../pages/user/AllPujaServices';


import PujaDetails from "../pages/user/PujaDetails";

import AllFamousPlaces from "../pages/user/AllFamousPlaces";
import About from "../pages/user/About";

import AllLiveBhajans from "../pages/user/AllLiveBhajans";
import LivePlayer from "../pages/user/LivePlayer"; // ✅ adjust path as needed

import MyBookings from "../pages/user/MyBookings";

import BookingHistory from "../pages/user/BookingHistory";


const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        {/* ✅ Public Pages (relative paths) */}
        <Route path="/about" element={<About />} />
        <Route path="" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/live/:id" element={<LivePlayer />} />
        
        <Route path="/famous-places" element={<AllFamousPlaces />} />
        <Route path="/live-bhajans" element={<AllLiveBhajans />} />

        {/* ✅ Protected Pages */}
        <Route element={<ProtectedRoute roles={["user", "admin"]} />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="booking" element={<Booking />} />

          <Route path="/booking/my" element={<MyBookings />} />

          <Route path="puja/booking" element={<PujaBooking />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<UserProfile />} />

{/* 
          <Route path="my-orders" element={<MyOrders />} /> */}

          <Route path="orders" element={<MyOrders />} />

          <Route path="orders/:id" element={<OrderDetails />} />

          <Route path="checkout" element={<Checkout />} />

          <Route path="/cancel-success" element={<CancelSuccess />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="pandits/:id" element={<PanditDetails />} />
          <Route path="pandits" element={<AllPandits />} />
          <Route path="/puja-details" element={<PujaDetails />} />
          <Route path="/live-bhajans" element={<AllLiveBhajans />} />
          <Route path="/live/:id" element={<LivePlayer />} /> 

          <Route path="booking/history" element={<BookingHistory />} />





          <Route path="/all-puja-services" element={<AllPujaServices />} />

          <Route path="/live/:id" element={<LivePlayer />} />


          

          

          

        </Route>

        {/* ✅ Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
