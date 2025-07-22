// src/pages/ThankYouPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col justify-center items-center px-4 text-center">
      <CheckCircleIcon className="h-20 w-20 text-green-500 mb-6" />

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
      <p className="text-gray-600 text-lg mb-4">
        Your order has been placed successfully.
      </p>

      <p className="text-gray-500 mb-8">
        We’ve sent a confirmation to your email. You’ll receive your order soon.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ThankYouPage;
