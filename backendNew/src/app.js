// backendNew/src/app.js

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config();

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔁 Routes
import authRoutes from './routes/user/auth.routes.js';
import bookingRoutes from './routes/user/booking.routes.js';
import productRoutes from './routes/admin/product.routes.js';
import userProductRoutes from './routes/user/product.routes.js';

import paymentRoutes from './routes/user/payment.routes.js';
import emailRoutes from './routes/user/email.routes.js';
import testRoutes from './routes/test.routes.js';
import userBlogRoutes from './routes/user/blog.routes.js';
import adminBlogRoutes from './routes/admin/blog.routes.js';
import adminBookingRoutes from './routes/admin/booking.routes.js';
import commentRoutes from './routes/user/comment.routes.js';

import userBookingRoutes from './routes/user/booking.routes.js';
import adminOrderRoutes from './routes/admin/order.routes.js';
import cartRoutes from './routes/user/cart.routes.js';
import orderRoutes from './routes/user/order.routes.js';
import adminRoutes from './routes/admin/admin.routes.js';


import dashboardRoutes from './routes/admin/dashboard.routes.js';


// 🔁 Middlewares
import { notFound, errorHandler } from './middleware/error.middleware.js';
import { verifyToken } from './middleware/auth.middleware.js'; // ✅ Corrected path

import adminDashboardRoutes from './routes/admin/dashboard.routes.js';
import userRoutes from './routes/user/user.routes.js';
;

// ✅ App Initialization
const app = express();

// ✅ Global Middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// ✅ Static Files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ User Routes
app.use('/api/auth', authRoutes);

app.use('/api/bookings', bookingRoutes);
app.use('/api/admin/bookings', verifyToken, adminBookingRoutes); // ✅ FIXED

app.use("/api/admin", adminRoutes); // this adds `/admin` prefix


// ✅ Admin Routes (PROTECTED)
app.use('/api/admin/blogs', verifyToken, adminBlogRoutes);
app.use('/api/user/blogs', userBlogRoutes);


app.use('/api/products', userProductRoutes);
// app.use('/api/admin/products', productRoutes);
app.use('/api/admin/products', productRoutes);
// ✅ User Blog Routes

app.use('/api/comments', commentRoutes);


app.use('/api/cart', cartRoutes);

app.use('/api/orders', orderRoutes);
app.use('/api/admin/orders', adminOrderRoutes);




app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/user', userRoutes); // ✅ Enables /api/user/dashboard/summary
app.use('/api/admin', verifyToken, adminRoutes); // ✅ Admin Dashboard

// app.use('/api/admin', dashboardRoutes);

app.use('/api/payments', paymentRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/test', testRoutes);



app.use('/uploads', express.static(path.join(process.cwd(), 'src/public/images/uploads')));

// ✅ Health Route
app.get('/', (req, res) => {
  res.send('🌸 Welcome to the Vrinda Religious Website API 🌸');
});

// ✅ Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
