// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import Blog from '../models/blog.model.js';
import Pandit from '../models/pandit.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import dayjs from 'dayjs';

// @desc    Admin Dashboard Summary
// @route   GET /api/admin/dashboard-summary
// @access  Private (Admin only)
export const getAdminDashboardSummary = asyncHandler(async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    // 📊 Total counts
    const [totalUsers, totalBookings, totalProducts, totalOrders, totalBlogs, totalPandits, approvedPandits, pendingPandits] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Blog.countDocuments(),
      Pandit.countDocuments(),
      Pandit.countDocuments({ status: 'approved' }),
      Pandit.countDocuments({ status: 'pending' }),
    ]);

    // 📊 Order status breakdown
    const [pendingOrders, confirmedOrders, cancelledOrders] = await Promise.all([
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'confirmed' }),
      Order.countDocuments({ status: 'cancelled' }),
    ]);

    // 🧾 Booking stats (last 7 days)
    const bookingStats = await Booking.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🧾 Order stats (last 7 days)
    const orderStats = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 📆 Last 7 days (formatted)
    const last7Days = Array.from({ length: 7 }).map((_, i) =>
      dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD')
    );

    // 📈 Format chart data (complete 7-day timeline)
    const bookingChart = last7Days.map((date) => {
      const entry = bookingStats.find((d) => d._id === date);
      return { date, count: entry?.count || 0 };
    });

    const orderChart = last7Days.map((date) => {
      const entry = orderStats.find((d) => d._id === date);
      return { date, count: entry?.count || 0 };
    });

    // ✅ Final Response
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totals: {
            totalUsers,
            totalBookings,
            totalBlogs,
            totalProducts,
            totalOrders,
            pendingOrders,
            confirmedOrders,
            cancelledOrders,
            totalPandits,
            approvedPandits,
            pendingPandits,
          },
          chart: {
            bookingChart,
            orderChart,
          },
        },
        'Admin dashboard summary with chart and order status data'
      )
    );
  } catch (error) {
    console.error('Dashboard Summary Error:', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Failed to fetch dashboard summary'));
  }
});
