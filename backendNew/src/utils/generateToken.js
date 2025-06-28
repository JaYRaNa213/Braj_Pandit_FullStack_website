// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/utils/generateToken.js
import jwt from 'jsonwebtoken';

/**
 * @description Generate JWT token with user ID and role
 * @param {String} id - User ID
 * @param {String} role - User role (admin/user)
 * @returns {String} - Signed JWT token
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '30d',
  });
};

export default generateToken;
