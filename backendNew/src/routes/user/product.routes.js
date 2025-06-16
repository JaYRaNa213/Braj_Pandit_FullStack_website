import express from 'express';
import { getAllProducts, getProductById } from '../../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);         // Public: Get all products
router.get('/:id', getProductById);      // Public: Get single product by ID

export default router;