import express from 'express';
import { addProduct, getAllProducts, deleteProduct, updateProduct } from '../../controllers/product.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';
import { isAdmin } from '../../middleware/role.middleware.js';
import upload from '../../middleware/multer.middleware.js';

const router = express.Router();

// Admin-only routes
router.post('/', verifyToken, isAdmin, upload.single('image'), addProduct);
router.get('/', verifyToken, isAdmin, getAllProducts);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), updateProduct);

export default router;