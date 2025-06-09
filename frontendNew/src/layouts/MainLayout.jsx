// src/layouts/MainLayout.jsx (or UserLayout / AdminLayout)

import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
