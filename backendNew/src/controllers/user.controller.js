// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';
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

// ✅ PUT Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { name, profileImage } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, 'User not found'));
  }

  if (name) user.name = name;
  if (profileImage) user.profileImage = profileImage;

  await user.save();

  const cleanUser = user.toObject();
  delete cleanUser.password;

  return res.status(200).json(
    new ApiResponse(200, cleanUser, 'Profile updated successfully')
  );
});

// ✅ POST Upload Profile Image
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
