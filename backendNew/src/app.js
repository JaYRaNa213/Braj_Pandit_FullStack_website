// src/app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route imports
import authRoutes from './routes/user/auth.routes.js';
import bookingRoutes from './routes/user/booking.routes.js';
import productRoutes from './routes/admin/product.routes.js';
import paymentRoutes from './routes/user/payment.routes.js';
import emailRoutes from './routes/user/email.routes.js';
import testRoutes from './routes/test.routes.js';
import userBlogRoutes from './routes/user/blog.routes.js';
import adminBlogRoutes from './routes/admin/blog.routes.js';

import adminBookingRoutes from "./routes/admin/booking.routes.js";

// Middleware imports
import { notFound, errorHandler } from './middleware/error.middleware.js';

import { verifyToken } from './middleware/auth.middleware.js';

// ✅ Initialize Express app
const app = express();

// ✅ Global middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// ✅ Static files (for image or file uploads)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user/blogs', userBlogRoutes);

// ✅ Admin routes (protected with token and admin middleware)
app.use('/api/admin/blogs', verifyToken, adminBlogRoutes);
// ✅ Admin routes (protected with token and admin middleware)
// app.use('/api/admin', verifyToken, adminBlogRoutes);

app.use('/api/payments', paymentRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/test', testRoutes);

app.use("/api/admin", adminBookingRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('🌸 Welcome to the Vrinda Religious Website API 🌸');
});

// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
