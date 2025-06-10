// src/server.js
import dotenv from 'dotenv';
dotenv.config(); // Load env variables first

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 7000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
