// frontendNew/src/routes/UserRoutes.jsx

import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";

// User Pages - Eagerly loaded (Critical)
import Home from "../pages/user/home/Home.jsx";

// User Pages - Lazy loaded (Secondary)
const Products = lazy(() => import("../pages/user/Products"));
const Blog = lazy(() => import("../pages/user/Blog"));
const Cart = lazy(() => import("../pages/user/CartPage"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const UserDashboard = lazy(() => import("../pages/user/UserDashboard.jsx"));
const MyOrders = lazy(() => import("../pages/user/MyOrders"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ProductDetails = lazy(() => import("../pages/user/ProductDetails"));
const Checkout = lazy(() => import("../pages/user/Checkout"));
const OrderDetails = lazy(() => import("../pages/user/OrderDetails"));
const CancelSuccess = lazy(() => import("../pages/user/CancelSuccess"));
const BlogDetails = lazy(() => import("../pages/user/BlogDetails"));
const PanditDetails = lazy(() => import("../pages/user/PanditDetails"));
const AllPandits = lazy(() => import("../pages/user/AllPandits"));
const AllPujaServices = lazy(() => import("../pages/user/AllPujaServices"));
const PujaDetails = lazy(() => import("../pages/user/PujaDetails"));
const AllFamousPlaces = lazy(() => import("../pages/user/AllFamousPlaces"));
const About = lazy(() => import("../pages/user/About"));
// const AllLiveBhajans = lazy(() => import("../pages/user/AllLiveBhajans"));
// const LivePlayer = lazy(() => import("../pages/user/LivePlayer"));
const MyBookings = lazy(() => import("../pages/user/MyBookings"));
const BookingHistory = lazy(() => import("../pages/user/BookingHistory"));
const OrderTracking = lazy(() => import("../pages/user/OrderTracking"));
const BookingForm = lazy(() => import("../pages/user/home/BookingForm"));
const PujaBooking = lazy(() => import("../pages/user/PujaBooking"));
const BePanditForm = lazy(() => import("../pages/user/BePanditForm.jsx"));
const AllEPujas = lazy(() => import("../pages/user/AllEPujas.jsx"));
const ThankYouPage = lazy(() => import("../pages/user/ThankYouPage.jsx"));

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route element={<Suspense fallback={<LoadingFallback />} />}>
          {/*  Public Pages */}
        <Route path="/about" element={<About />} />
        <Route path="" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="/live/:id" element={<LivePlayer />} /> */}
        <Route path="/famous-places" element={<AllFamousPlaces />} />
        {/* <Route path="/live-bhajans" element={<AllLiveBhajans />} /> */}

        {/*  Protected Pages */}
        <Route element={<ProtectedRoute roles={["user", "admin"]} />}>
          <Route path="dashboard" element={<UserDashboard />} />

          <Route path="/booking" element={<BookingForm />} />
          <Route path="/booking/my" element={<MyBookings />} />
          <Route path="/puja-booking" element={<PujaBooking />} />

          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/cancel-success" element={<CancelSuccess />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="pandits/:id" element={<PanditDetails />} />
          <Route path="pandits" element={<AllPandits />} />
          <Route path="/puja-details" element={<PujaDetails />} />
          <Route path="booking/history" element={<BookingHistory />} />
          <Route path="orders/:id/tracking" element={<OrderTracking />} />
          <Route path="/all-puja-services" element={<AllPujaServices />} />
          <Route path="/thank-you" element={<ThankYouPage />} />


         <Route path="/be-a-pandit" element={<BePanditForm />} />
         <Route path="/all-e-pujas" element={<AllEPujas />} />


        </Route>

        {/*  Fallback */}
        <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
