
import express from 'express';
import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import Blog from '../models/blog.model.js';

import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';


export const getPujaBookings = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort = 'date',
      order = 'asc',
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.max(Number(limit), 1);
    const sortField = sort.replace('-', '');
    const sortOrder = sort.startsWith('-') ? -1 : 1;

    const searchFilter = search
      ? {
          $or: [
            { service: { $regex: search, $options: 'i' } },
            { pandit: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const total = await Booking.countDocuments(searchFilter);

    const bookings = await Booking.find(searchFilter)
      .populate("user", "name")
      .sort({ [sortField]: sortOrder })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    const formatted = bookings.map((b) => ({
      _id: b._id,
      userName: b.user?.name || 'N/A',
      service: b.service,
      pandit: b.pandit,
      date: b.date,
      time: b.time,
      status: b.status,
    }));

    res.status(200).json({
      success: true,
      message: "Bookings fetched",
      data: formatted,
      total,
      page: currentPage,
      totalPages: Math.ceil(total / perPage),
    });
  } catch (err) {
    console.error("Booking fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserAdminDashboardSummary = async (req, res) => {
  try {
    const [totalUsers, totalBookings, totalProducts, totalOrders, totalBlogs] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Blog.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: 'Admin dashboard summary fetched successfully',
      data: {
        totalUsers,
        totalBookings,
        totalProducts,
        totalOrders,
        totalBlogs,
      },
    });
  } catch (error) {
    console.error('Error in getAdminDashboardSummary:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// ✅ Update Puja booking status
export const updatePujaBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const booking = await Booking.findById(id);
  if (!booking) {
    return res.status(404).json(new ApiResponse(404, null, 'Booking not found'));
  }

  booking.status = status;
  await booking.save();

  return res.status(200).json(new ApiResponse(200, booking, 'Booking status updated'));
});


export const getAllUsersAdmin = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password -refreshToken');
  res.status(200).json(new ApiResponse(200, users, 'All users fetched successfully'));
});




export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// 🔹 Update user by admin
export const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, role, isVerified } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.role = role || user.role;
    user.isVerified = isVerified ?? user.isVerified;

    await user.save();
    res.status(200).json({ success: true, message: "User updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

// 🔹 Delete user by admin
export const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};


export const deletePujaBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  res.status(200).json({ success: true, message: 'Booking deleted successfully' });
});
