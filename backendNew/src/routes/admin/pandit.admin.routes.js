// backend/src/routes/admin/pandit.admin.routes.js
import express from 'express';
import {
  addPandit,
  updatePanditStatus,
  deletePandit,
  getPanditById,
  getAdminAllPandits,
} from '../../controllers/pandit.controller.js';

const router = express.Router();

router.post('/', addPandit);
router.get('/', getAdminAllPandits);
router.get('/:id', getPanditById);
router.patch('/:id/status', updatePanditStatus);
router.delete('/:id', deletePandit);

export default router;
