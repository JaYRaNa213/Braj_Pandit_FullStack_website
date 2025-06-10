import dotenv from 'dotenv';
dotenv.config();

import {
  registerUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
} from '../services/auth.service.js';

import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// ========================
// ✅ Register Controller
// ========================
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ========================
// ✅ Login Controller (with fixed admin support)
// ========================
export const login = async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Fixed Admin Login
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const adminUser = {
      _id: 'admin-fixed-id',
      email,
      name: 'Admin',
      role: 'admin',
    };
    const token = generateToken(adminUser._id, 'admin');
    return res.status(200).json({ token, user: adminUser });
  }

  // 2️⃣ Normal User Login
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

  const token = generateToken(user._id, user.role || 'user');
  res.cookie('token', token, { httpOnly: true });
  res.status(200).json({
    token,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role || 'user',
    },
  });
};

// ========================
// ✅ Logout Controller
// ========================
export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: await logoutUser(),
  });
};

// ========================
// ✅ Get User Profile Controller
// ========================
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userProfile = await getUserProfile(userId);

    res.status(200).json({
      success: true,
      message: 'User profile fetched successfully',
      data: userProfile,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// ========================
// ✅ Get All Users Controller
// ========================
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      message: 'All users fetched successfully',
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
