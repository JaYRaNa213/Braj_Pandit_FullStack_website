// src/routes/user/pandit.routes.js
import express from 'express';
import { getAllPandits } from '../../controllers/pandit.controller.js';

const router = express.Router();

router.get('/', getAllPandits);

export default router;
