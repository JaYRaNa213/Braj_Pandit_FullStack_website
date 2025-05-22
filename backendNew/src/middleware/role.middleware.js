// src/middleware/role.middleware.js
import ApiError from '../utils/ApiError.js';

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Access denied: Insufficient permissions'));
    }
    next();
  };
};
