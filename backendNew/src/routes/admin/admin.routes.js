// File: backendNew/src/routes/admin/admin.routes.js

import express from 'express';
import { getPujaBookings } from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/puja-bookings', authMiddleware, authorizeRoles('admin'), getPujaBookings);

export default router;
