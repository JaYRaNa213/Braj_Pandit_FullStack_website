// src/server.js

import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to DB
connectDB();

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  
  


});
