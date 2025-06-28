// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React from 'react';
import { Link } from 'react-router-dom';

const CancelSuccess = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-6">
    <h2 className="text-2xl font-bold text-red-600 mb-4">Order Cancelled Successfully</h2>
    <p className="text-gray-700 mb-6">We’ve cancelled your order as requested.</p>
    <Link
      to="/products"
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Browse More Products
    </Link>
  </div>
);

export default CancelSuccess;

