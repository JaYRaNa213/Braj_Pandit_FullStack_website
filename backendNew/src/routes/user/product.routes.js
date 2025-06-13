// source: backendNew/src/routes/user/product.routes.js

import express from 'express';
import { getAllProducts, getProductById } from '../../controllers/product.controller.js';

const router = express.Router();

// ✅ Public Routes (accessible without auth)
router.get('/', getAllProducts);         // Get all products
router.get('/:id', getProductById);      // Get single product by ID

export default router;
