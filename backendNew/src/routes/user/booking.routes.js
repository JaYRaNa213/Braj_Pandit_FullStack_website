// backendNew/src/routes/user/booking.routes.js

import express from 'express';
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  getSingleBooking,
  updateBooking,
  updateBookingStatus,  // <-- Add this import
  deleteBooking,
} from '../../controllers/booking.controller.js';
import { authMiddleware, verifyToken } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/role.middleware.js';

const router = express.Router();

// Puja Booking (alias)
router.post('/puja',verifyToken, authMiddleware, authorizeRoles('user'), createBooking);

// Default Create Booking
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

// **NEW** Admin: Update only booking status
router.patch('/:id/status', authMiddleware, authorizeRoles('admin'), updateBookingStatus);

export default router;
