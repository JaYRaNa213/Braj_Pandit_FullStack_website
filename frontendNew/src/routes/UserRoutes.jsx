import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

// Importing user pages
import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import Blog from "../pages/user/Blog";
import Booking from "../pages/user/Booking";
import PujaBooking from "../pages/user/PujaBooking";
import Cart from "../pages/user/Cart";
import UserProfile from "../pages/user/UserProfile";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/puja-booking" element={<PujaBooking />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
