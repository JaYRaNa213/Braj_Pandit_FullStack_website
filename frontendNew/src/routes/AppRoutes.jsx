import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
import Blog from "../pages/user/Blog";
import Products from "../pages/user/Products";
import Booking from "../pages/user/Booking";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/products" element={<Products />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
