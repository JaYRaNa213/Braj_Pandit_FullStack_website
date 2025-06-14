//src/routes/admin/admin.routes.js

import express from 'express';
import {
  getPujaBookings,
  updatePujaBookingStatus,
  getAllUsersAdmin,
} from '../../controllers/admin/admin.controller.js';
import {
  createBlog,
  updateBlog,
  deleteBlog,
} from '../../controllers/admin/blog.controller.js';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/admin/product.controller.js';

import authMiddleware from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import upload from '../../middlewares/multer.middleware.js'; // for blog/product image uploads

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
router.delete('/blogs/:id', deleteBlog);

// ✅ Product Management
router.post('/products', upload.single('image'), createProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

// ✅ Users (optional: view all users)
router.get('/users', getAllUsersAdmin);

export default router;
