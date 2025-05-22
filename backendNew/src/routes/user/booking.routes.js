import express from 'express';
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
} from '../../controllers/booking.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/role.middleware.js';

const router = express.Router();

// User-only: Create booking
router.post('/', authMiddleware, authorizeRoles('user'), createBooking);

// Admin: Get all bookings
router.get('/', authMiddleware, authorizeRoles('admin'), getAllBookings);

// User: Get own bookings
router.get('/my', authMiddleware, authorizeRoles('user'), getUserBookings);

// Admin: Single booking by ID
router.get('/:id', authMiddleware, authorizeRoles('admin'), getSingleBooking);

// Admin: Update booking
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateBooking);

// Admin: Delete booking
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteBooking);

export default router;
