// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// Main router for the application
// routes/index.routes.js
// Import required modules
import express from 'express';
import authRoutes from './user/auth.routes.js';
import bookingRoutes from './user/booking.routes.js';
import productRoutes from './admin/product.routes.js';

import userblogRoutes from './user/blog.routes.js';
import adminblogRoutes from './admin/blog.routes.js';

import paymentRoutes from './user/payment.routes.js';
import emailRoutes from './user/email.routes.js';
import testRoutes from './test.routes.js';

const router = express.Router();

// Use routes with respective prefixes
router.use('/auth', authRoutes);
router.use('/booking', bookingRoutes);

router.use('/products', productRoutes);
router.use('api/blogs', userblogRoutes);

router.use('api/admin/blogs', adminblogRoutes);
router.use('/payment', paymentRoutes);
router.use('/email', emailRoutes);
router.use('/api/test', testRoutes);


export default router; // Export the main router
