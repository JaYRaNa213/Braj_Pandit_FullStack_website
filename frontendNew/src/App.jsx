// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify"; // ✅ FIXED
import "react-toastify/dist/ReactToastify.css"; // ✅ required style
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
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
