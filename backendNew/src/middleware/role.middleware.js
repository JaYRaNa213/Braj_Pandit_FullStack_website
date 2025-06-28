// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import ApiError from '../utils/ApiError.js';

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user?.role) return next(new ApiError(403, 'Access denied: No role attached'));
  if (!roles.includes(req.user.role)) return next(new ApiError(403, 'Access denied: Insufficient permissions'));
  next();
};
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new ApiError(403, 'Access denied: Admins only'));
  }
  next();
};