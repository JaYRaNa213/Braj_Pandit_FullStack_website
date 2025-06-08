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
