// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify"; // ✅ FIXED
import "react-toastify/dist/ReactToastify.css"; // ✅ required style
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
            <ToastContainer position="top-center" autoClose={3000} />
        </CartProvider>
        {/* <ToastContainer position="top-center" autoClose={3000} /> */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
