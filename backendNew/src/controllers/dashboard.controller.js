// src/controllers/dashboard.controller.js

import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import Blog from '../models/blog.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import dayjs from 'dayjs';

// @desc    Admin Dashboard Summary
// @route   GET /api/admin/dashboard-summary
// @access  Private (Admin only)
export const getAdminDashboardSummary = asyncHandler(async (req, res) => {
  try {
    // 📅 Date range for past 7 days
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6); // includes today

    // 📊 Total counts
    const [totalUsers, totalBookings, totalBlogs, totalProducts, totalOrders] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Blog.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
    ]);

    // 🧾 Booking stats for chart
    const bookingStats = await Booking.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // 🧾 Order stats for chart
    const orderStats = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // 📆 Generate last 7 days
    const getLast7Days = () => {
      const dates = [];
      for (let i = 6; i >= 0; i--) {
        dates.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
      }
      return dates;
    };

    const last7Days = getLast7Days();

    // 📈 Format chart data to always return 7 entries
    const bookingChart = last7Days.map(date => {
      const entry = bookingStats.find(d => d._id === date);
      return { date, count: entry?.count || 0 };
    });

    const orderChart = last7Days.map(date => {
      const entry = orderStats.find(d => d._id === date);
      return { date, count: entry?.count || 0 };
    });

    // ✅ Final JSON response
    return res.status(200).json(
      new ApiResponse(200, {
        totals: {
          totalUsers,
          totalBookings,
          totalBlogs,
          totalProducts,
          totalOrders,
        },
        chart: {
          bookingChart,
          orderChart,
        }
      }, 'Admin dashboard summary with chart data')
    );
  } catch (error) {
    console.error('Dashboard Summary Error:', error);
    return res.status(500).json(
      new ApiResponse(500, null, 'Failed to fetch dashboard summary')
    );
  }
});
