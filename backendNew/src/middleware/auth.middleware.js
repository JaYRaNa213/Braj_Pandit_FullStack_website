// src/middleware/auth.middleware.js

import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// ✅ Middleware 1: Verify JWT from header or cookie
export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new ApiError(403, 'Unauthorized request: No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded?.id).select('-password -refreshToken');
    if (!user) {
      throw new ApiError(401, 'Invalid Access Token: User not found');
    }

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Unauthorized! Invalid token.');
  }
});

// ✅ Middleware 2: Protect - Simple header token check
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'user',
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, invalid token',
    });
  }
};

// ✅ Middleware 3: authMiddleware - Basic auth checker
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'user',
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// ✅ Middleware 4: isAuthenticated — for use in route files
export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};
