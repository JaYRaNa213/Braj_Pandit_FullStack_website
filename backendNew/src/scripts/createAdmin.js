// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// Correct path to .env relative to this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const createAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('❌ MONGO_URI is undefined. Check your .env path and contents.');
    }

    console.log('📡 Connecting to DB:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: 'jayrana0909@gmail.com' });
    if (existing) {
      console.log('✅ Admin already exists');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('Jay2002@', 10);
    const admin = await User.create({
      name: 'Super Admin Jay Rana',
      email: 'jayrana0909@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin created with ID:', admin._id.toString());
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
