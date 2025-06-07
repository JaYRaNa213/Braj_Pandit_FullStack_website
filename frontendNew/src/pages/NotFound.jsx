// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Sorry, the page you requested does not exist.</p>
      <Link to="/" className="text-purple-700 underline">
        Go to Home
      </Link>
    </div>
  );
}
