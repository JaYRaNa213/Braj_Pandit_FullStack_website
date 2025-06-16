// src/routes/admin/admin.routes.js

import express from 'express';
import {
  
  verifyToken,
  isAdmin,
  authMiddleware,
  authorizeRoles,
} from '../../middleware/auth.middleware.js';

import {
  getPujaBookings,
  updatePujaBookingStatus,
  getAllUsersAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
} from '../../controllers/admin.controller.js';

import {
  addBlog,
  updateBlog,
  deleteBlog,
} from '../../controllers/blog.controller.js';

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/product.controller.js';

import upload from '../../middleware/multer.middleware.js'; // for blog/product image uploads

import { getUserAdminDashboardSummary } from '../../controllers/admin.controller.js';

const router = express.Router();

// ✅ Apply admin auth globally to all routes below
router.use(authMiddleware, authorizeRoles('admin'));

// ✅ Dashboard Summary
router.get('/dashboard-summary', getUserAdminDashboardSummary);

// ✅ Puja Bookings
router.get('/puja/bookings', getPujaBookings);
router.put('/puja/bookings/:id', updatePujaBookingStatus);

// ✅ Blog Management
router.post('/blogs', upload.single('image'), addBlog);
router.put('/blogs/:id', upload.single('image'), updateBlog);
router.delete('/blogs/:id', deleteBlog);

// ✅ Product Management
router.post('/products', upload.single('image'), addProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

// ✅ User Management (Admin Only)
router.get('/users', getAllUsersAdmin);
router.put('/users/:id', updateUserByAdmin);
router.delete('/users/:id', deleteUserByAdmin);

export default router;
