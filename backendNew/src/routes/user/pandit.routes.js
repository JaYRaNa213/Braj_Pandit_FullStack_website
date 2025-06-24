// backend/src/routes/user/pandit.routes.js
import express from 'express';
import { getAllPandits, getPanditById } from '../../controllers/pandit.controller.js';

const router = express.Router();

router.get('/', getAllPandits);
router.get('/:id', getPanditById);

export default router;

