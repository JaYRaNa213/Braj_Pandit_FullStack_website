import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";
import BackButton from "../components/common/BackButton"; // ✅ Import here

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <BackButton /> {/* ✅ Add it globally */}
      <main className="min-h-screen w-full bg-gradient-to-br from-yellow-50 to-red-50 dark:from-zinc-900 dark:to-zinc-800">
  <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
