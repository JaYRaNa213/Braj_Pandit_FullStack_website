// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import express from 'express';
import { getAllProducts, getProductById } from '../../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);         // Public: Get all products
router.get('/:id', getProductById);      // Public: Get single product by ID

export default router;