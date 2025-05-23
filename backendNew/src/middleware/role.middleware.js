// src/middleware/role.middleware.js
import ApiError from '../utils/ApiError.js';

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new ApiError(403, 'Access denied: No role found on user'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Access denied: Insufficient permissions'));
    }

    next();
  };
};
