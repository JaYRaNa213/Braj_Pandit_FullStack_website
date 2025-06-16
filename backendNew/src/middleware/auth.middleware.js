// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// 🔐 Verify JWT Token Middleware
export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : req.cookies?.token;

  if (!token) {
    throw new ApiError(403, 'Unauthorized: No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Special Case: Fixed Admin Login
    if (decoded?.id === 'admin-fixed-id') {
      req.user = {
        id: decoded.id,
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        role: 'admin',
      };
      return next();
    }

    // ✅ Normal User from DB
    const user = await User.findById(decoded.id).select('-password -refreshToken');
    if (!user) throw new ApiError(401, 'User not found');

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    throw new ApiError(401, error.message || 'Invalid token');
  }
});

// 🔐 Role-based access middleware
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user?.role) {
    return next(new ApiError(403, 'Access denied: No role provided'));
  }
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, `Access denied: Only [${roles.join(', ')}] allowed`));
  }
  next();
};

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Unauthorized: No token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role || 'user',
    };
    next();
  } catch (err) {
    return next(new ApiError(401, 'Unauthorized: Invalid token'));
  }
};
// At the bottom of auth.middleware.js


export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new ApiError(403, 'Access denied: Admins only'));
  }
  next();
};
