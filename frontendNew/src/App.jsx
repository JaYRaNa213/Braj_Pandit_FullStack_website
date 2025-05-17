// import { BrowserRouter } from 'react-router-dom';
// import AppRoutes from './routes/AppRoutes';
// import Header from './components/Header';
// import Footer from './components/Footer';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Header />
//       <AppRoutes />
//       <Footer />
//     </BrowserRouter>
//   );
// }


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home.jsx";
import Blog from "./pages/user/Blog.jsx";
import Products from "./pages/user/Products.jsx";
import Booking from "./pages/user/Booking.jsx";
// import Booking from "./pages/user/PujaBooking.jsx";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import Dashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

// import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/products" element={<Products />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
