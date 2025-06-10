// src/app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.routes.js';

// Load environment variables
dotenv.config();

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route imports
import authRoutes from './routes/user/auth.routes.js';
import bookingRoutes from './routes/user/booking.routes.js';
import productRoutes from './routes/admin/product.routes.js';
import blogRoutes from './routes/admin/blog.routes.js';
import paymentRoutes from './routes/user/payment.routes.js';
import emailRoutes from './routes/user/email.routes.js';
import testRoutes from './routes/test.routes.js';

import userblogRoutes from './routes/user/blog.routes.js';
import adminblogRoutes from './routes/admin/blog.routes.js';

// Error middleware
import { notFound, errorHandler } from './middleware/error.middleware.js';

// Express app instance
const app = express();

// Global middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);

app.use('/api/booking', bookingRoutes);

app.use('/api/products', productRoutes);


app.use('/api/user/blogs', userblogRoutes);
app.use('/api/admin/blogs', adminblogRoutes);

app.use('/api/payments', paymentRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/test', testRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🌸 Welcome to the Vrinda Religious Website API 🌸');
});

// 404 and error handler
app.use(notFound);
app.use(errorHandler);

export default app;
