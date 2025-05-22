// src/middleware/error.middleware.js

import ApiError from '../utils/ApiError.js';

// Middleware to handle 404 Not Found errors
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found!',
  });
};

// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (err instanceof ApiError) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors: err.errors || [],
    });
  }

  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
