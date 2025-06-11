import express from 'express';
import { register, login, logout, getProfile, getUsers } from '../../controllers/auth.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js'; // ✅ use verifyToken instead

const router = express.Router();

// ✅ Auth Routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', verifyToken, getProfile); // ✅ replaced
router.get('/users', verifyToken, getUsers);     // ✅ replaced

export default router;
