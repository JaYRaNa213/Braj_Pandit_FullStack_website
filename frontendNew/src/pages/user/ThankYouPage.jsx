import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6">
      <div className="text-center max-w-xl bg-gray-100 dark:bg-gray-800 p-10 rounded-xl shadow-lg">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Thank You!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Your order has been placed successfully.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
