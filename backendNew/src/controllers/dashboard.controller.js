// src/controllers/dashboard.controller.js

import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import Blog from '../models/blog.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getAdminDashboardSummary = asyncHandler(async (req, res) => {
  const [totalUsers, totalBookings, totalBlogs, totalProducts, totalOrders] = await Promise.all([
    User.countDocuments(),
    Booking.countDocuments(),
    Blog.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      totalUsers,
      totalBookings,
      totalBlogs,
      totalProducts,
      totalOrders,
    }, 'Admin dashboard summary fetched successfully')
  );
});