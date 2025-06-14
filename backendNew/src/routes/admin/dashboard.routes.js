// src/routes/admin/dashboard.routes.js

import express from 'express';
import { verifyToken } from '../../middleware/auth.middleware.js';
import { isAdmin } from '../../middleware/role.middleware.js';
import { getAdminDashboardSummary } from '../../controllers/dashboard.controller.js';


const router = express.Router();

router.get('/summary', verifyToken, isAdmin, getAdminDashboardSummary);


export default router;
