//src/routes/admin/admin.routes.js

import express from 'express';
import {
  getPujaBookings,
  updatePujaBookingStatus,
  getAllUsersAdmin,
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

import { verifyToken,isAdmin, authMiddleware, authorizeRoles } from '../../middleware/auth.middleware.js';
import upload from '../../middleware/multer.middleware.js'; // for blog/product image uploads

import { getAdminDashboardSummary } from '../../controllers/dashboard.controller.js';

const router = express.Router();

// Apply admin auth + role middleware
router.use(authMiddleware, authorizeRoles('admin'));

// ✅ Puja Bookings Management
router.get('/puja-bookings', getPujaBookings);
router.put('/puja-bookings/:id', updatePujaBookingStatus);

// ✅ Blog Management
// router.post('/blogs', verifyToken,isAdmin,upload.single('image'), addBlog);
router.post('/blogs', verifyToken, isAdmin, upload.single('image'), addBlog);


router.put('/blogs/:id', upload.single('image'), updateBlog);

// ✅ Add this route (if not already added)
router.get('/dashboard-summary', verifyToken, isAdmin,authorizeRoles('admin'), getAdminDashboardSummary);


router.delete('/blogs/:id', deleteBlog);

// ✅ Product Management
router.post('/products', upload.single('image'), addProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

// ✅ Users (optional: view all users)
router.get('/users', getAllUsersAdmin);

export default router;
