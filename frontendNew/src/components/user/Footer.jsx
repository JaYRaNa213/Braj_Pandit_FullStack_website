// src/components/user/Footer.jsx
import React from "react";

export default function UserFooter() {
  return (
    <footer className="bg-green-700 text-white p-6 mt-8 text-center">
      <p>© {new Date().getFullYear()} DharmaSite User. All rights reserved.</p>
    </footer>
  );
}
