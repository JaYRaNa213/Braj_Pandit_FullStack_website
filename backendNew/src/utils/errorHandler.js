// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import ApiError from './ApiError.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof ApiError) {
    return res.status(statusCode).json({
      success: false,
      message: message,
      errors: err.errors || [],
    });
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default errorHandler;
