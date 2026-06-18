// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/controllers/auth.controller.js
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

// ✅ Register User
export const register = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!name || !email || !password ) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const user = await registerUser({ name, email, password });

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

// ✅ Login (Handles Admin + Users)
export const login = async (req, res) => {
  try {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    // ✅ Admin Login
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = generateToken(process.env.ADMIN_ID, 'admin');
      return res.status(200).json({
        token,
        user: {
          _id: process.env.ADMIN_ID,
          email,
          name: 'Admin',
          role: 'admin',
        },
      });
    }

    // ✅ Normal User Login
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });

    const token = generateToken(user._id, user.role);
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ✅ Logout
export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: await logoutUser(),
  });
};



// ✅ Get Authenticated User Profile
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

// ✅ Get All Users
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
