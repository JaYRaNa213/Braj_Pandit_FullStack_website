// 🔐 Code developed by Jay Rana © 26/09/2025

import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const admins = [
  {
    name: 'Super Admin Jay Rana',
    email: process.env.ADMIN_EMAIL || 'brajpandit123@gmail.com',
    password: process.env.ADMIN_PASSWORD || 'Braj@Pandit123',
  },
  {
    name: 'Braj Pandit Admin Team',
    email: process.env.ADMIN_EMAIL_1 || 'jayrana0909@gmail.com',
    password: process.env.ADMIN_PASSWORD_1 || 'JayBraj2002@',
  },
];

const createAdmins = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('❌ MONGO_URI is undefined. Check your .env file.');
    }

    console.log('📡 Connecting to DB...');
    await mongoose.connect(process.env.MONGO_URI);

    for (const adminData of admins) {
      const existing = await User.findOne({ email: adminData.email });
      if (existing) {
        console.log(`✅ Admin already exists: ${adminData.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      const newAdmin = await User.create({
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword,
        role: 'admin',
      });

      console.log(`✅ Created admin: ${newAdmin.email} (ID: ${newAdmin._id})`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to create admins:', err.message);
    process.exit(1);
  }
};

createAdmins();
