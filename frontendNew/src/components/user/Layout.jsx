// src/components/user/Layout.jsx
import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
