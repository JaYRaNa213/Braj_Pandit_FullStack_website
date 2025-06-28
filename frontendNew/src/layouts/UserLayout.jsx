// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// File: frontendNew/src/layouts/UserLayout.jsx

import React from "react";
import Navbar from "../components/common/Navbar"; // Or user/Navbar if you're using that
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet /> {/* 👈 Very important! This renders Home.jsx */}
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
