// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/routes/admin/dashboard.routes.js

import express from 'express';
import { verifyToken } from '../../middleware/auth.middleware.js';
import { isAdmin } from '../../middleware/role.middleware.js';
import { getAdminDashboardSummary } from '../../controllers/dashboard.controller.js';


const router = express.Router();

router.get('/summary', verifyToken, isAdmin, getAdminDashboardSummary);


export default router;
