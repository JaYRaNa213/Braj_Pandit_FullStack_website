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
