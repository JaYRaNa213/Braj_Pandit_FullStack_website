// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import express from 'express';
import {
  addPandit,
  updatePanditStatus,
  deletePandit,
  getPanditById,
  getAdminAllPandits,
} from '../../controllers/pandit.controller.js';
import { verifyToken, authorizeRoles } from '../../middleware/auth.middleware.js';

const router = express.Router();

// 👇 Add proper middlewares
router.post('/', verifyToken, authorizeRoles('admin'), addPandit);
router.get('/', verifyToken, authorizeRoles('admin'), getAdminAllPandits);
router.get('/:id', verifyToken, authorizeRoles('admin'), getPanditById);
router.patch('/:id/status', verifyToken, authorizeRoles('admin'), updatePanditStatus);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deletePandit);

export default router;
