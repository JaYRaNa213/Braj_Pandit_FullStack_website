// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/controllers/user.controller.js

import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';
import Blog from '../models/blog.model.js';
import Product from '../models/product.model.js';

import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// ✅ GET User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).select('-password');
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, 'User not found'));
  }

  const [bookings, orders, cart] = await Promise.all([
    Booking.find({ user: userId }),
    Order.find({ user: userId }),
    Cart.findOne({ user: userId }),
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      user,
      bookings,
      orders,
      cart: cart?.items || [],
    }, 'User profile fetched successfully')
  );
});

// ✅ POST Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, email, profileImage } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, 'User not found'));
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.profileImage = profileImage || user.profileImage;

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, user, 'Profile updated successfully')
  );
});







export const uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json(new ApiResponse(400, null, "No file uploaded"));
  }

  const uploadResult = await uploadOnCloudinary(req.file.path);
  if (!uploadResult) {
    return res.status(500).json(new ApiResponse(500, null, "Cloudinary upload failed"));
  }

  return res.status(200).json(new ApiResponse(200, uploadResult.secure_url, "Image uploaded"));
});