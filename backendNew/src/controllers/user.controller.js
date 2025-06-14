import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import Cart from '../models/cart.model.js';

import Order from '../models/order.model.js';

// Import these if you want to use them
import Blog from '../models/blog.model.js';
import Product from '../models/product.model.js';

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    const userId = req.user._id || req.user.id; // Make sure req.user is set by middleware

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, profileImage },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error. Unable to update profile.',
    });

    
  }
};



export const getUserDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    console.log("User ID:", userId);

    const bookingCount = await Booking.countDocuments({ user: userId });

    const cart = await Cart.findOne({ user: userId });
    const cartItemCount = cart ? cart.items.length : 0;

    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(3);

    res.status(200).json({
      success: true,
      message: 'User dashboard summary fetched successfully',
      data: {
        bookingCount,
        cartItemCount,
        recentBlogs,
        recentProducts,
      },
    });
  } catch (error) {
    console.error('Error in getUserDashboardSummary:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};