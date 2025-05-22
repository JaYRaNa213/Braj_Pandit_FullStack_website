// src/app.js

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports - updated paths based on your tree
import authRoutes from './routes/user/auth.routes.js';
import bookingRoutes from './routes/user/booking.routes.js';
import productRoutes from './routes/admin/product.routes.js';
import blogRoutes from './routes/admin/blog.routes.js';
import paymentRoutes from './routes/user/payment.routes.js';
import emailRoutes from './routes/user/email.routes.js';
import testRoutes from './routes/test.routes.js';

// Error handling middlewares
import { notFound, errorHandler } from './middleware/error.middleware.js';

// Load env variables
dotenv.config();

// ES modules __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/test', testRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Religious Website API!');
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
