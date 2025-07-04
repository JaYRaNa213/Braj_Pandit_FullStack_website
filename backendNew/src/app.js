// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

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

import cartRoutes from './routes/user/cart.routes.js';
import orderRoutes from './routes/user/order.routes.js';
import adminRoutes from './routes/admin/admin.routes.js';
import userOrderRoutes from "./routes/user/order.routes.js";
import adminOrderRoutes from "./routes/admin/order.routes.js";

import adminPanditRoutes from './routes/admin/pandit.admin.routes.js';
import userPanditRoutes from './routes/user/pandit.routes.js';


import dashboardRoutes from './routes/admin/dashboard.routes.js';


// 🔁 Middlewares
import { notFound, errorHandler } from './middleware/error.middleware.js';
import { verifyToken } from './middleware/auth.middleware.js'; // ✅ Corrected path

import adminDashboardRoutes from './routes/admin/dashboard.routes.js';
import userRoutes from './routes/user/user.routes.js';

import callBookingRoutes from "./routes/user/callBooking.routes.js";

import liveRoutes from "./routes/user/live.routes.js";
import adminLiveRoutes from "./routes/admin/live.routes.js";

import userBookingRoutes from './routes/user/booking.routes.js';


// ✅ App Initialization
const app = express();

// ✅ Global Middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];


// ✅ Define allowed domains
const allowedOrigins = [
  "https://brajpandit.vercel.app",
  "http://localhost:5173"
];

// ✅ Use CORS middleware with options
app.use(
  cors({
    origin: [
      "https://brajpandit.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);





// ✅ Static Files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ User Routes
app.use('/api/auth', authRoutes);

app.use('/api/bookings', bookingRoutes);
app.use('/api/admin/bookings', verifyToken, adminBookingRoutes); // ✅ FIXED



// Make sure this exact path is used
app.use('/api/user/booking', userBookingRoutes);




// ✅ Admin Routes (PROTECTED)
app.use('/api/admin/blogs', verifyToken, adminBlogRoutes);
app.use('/api/user/blogs', userBlogRoutes);


app.use('/api/products', userProductRoutes);
// app.use('/api/admin/products', productRoutes);
app.use('/api/admin/products', productRoutes);
// ✅ User Blog Routes

app.use('/api/comments', commentRoutes);


app.use("/api/cart", cartRoutes);



app.use('/api/orders', userOrderRoutes);
app.use('/api/admin/orders', adminOrderRoutes);




app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/user', userRoutes); // ✅ Enables /api/user/dashboard/summary
app.use('/api/admin', verifyToken, adminRoutes); // ✅ Admin Dashboard

// app.use('/api/admin', dashboardRoutes);

app.use('/api/payments', paymentRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/test', testRoutes);

app.use('/api/admin/pandits', adminPanditRoutes);
app.use('/api/user/pandits', userPanditRoutes);


app.use("/api/user/callBookings", callBookingRoutes);



// app.use("/api/user/live-bhajans", liveRoutes);

app.use("/api/live", liveRoutes);
app.use("/api/admin/live", adminLiveRoutes);



app.use('/uploads', express.static(path.join(process.cwd(), 'src/public/images/uploads')));




// ✅ Health Route
app.get('/', (req, res) => {
  res.send('🌸 Welcome to the Vrinda Religious Website API 🌸');
});

// ✅ Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
