import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import Blog from '../models/blog.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import dayjs from 'dayjs';

export const getAdminDashboardSummary = asyncHandler(async (req, res) => {
  // 📅 Setup date range
  const jsToday = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(jsToday.getDate() - 6); // 7 days including today

  // 📊 Totals
  const [totalUsers, totalBookings, totalBlogs, totalProducts, totalOrders] = await Promise.all([
    User.countDocuments(),
    Booking.countDocuments(),
    Blog.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
  ]);

  // 🧾 Booking chart data (last 7 days)
  const bookingStats = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // 🧾 Order chart data (last 7 days)
  const orderStats = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // 🗓️ Generate last 7 days (YYYY-MM-DD)
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
      dates.push(d);
    }
    return dates;
  };

  const last7Days = getLast7Days();

  // 📈 Format chart data
  const bookingChart = last7Days.map(date => {
    const stat = bookingStats.find(d => d._id === date);
    return { date, count: stat ? stat.count : 0 };
  });

  const orderChart = last7Days.map(date => {
    const stat = orderStats.find(d => d._id === date);
    return { date, count: stat ? stat.count : 0 };
  });

  // 📦 Return dashboard summary
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
});
