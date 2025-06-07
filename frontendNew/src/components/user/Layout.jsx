// src/components/user/Layout.jsx
import React from "react";
import UserNavbar from "./Navbar";
import UserFooter from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar />
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
      <UserFooter />
    </div>
  );
}
