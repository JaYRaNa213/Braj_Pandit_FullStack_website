// src/services/auth.service.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

// ========================
// ✅ Register User Logic
// ========================
export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = await User.create({
    name,
    email: normalizedEmail,
    password, // let model handle hashing
    role: role || 'user',
  });

  console.log('✅ New User Registered:', newUser);

  return {
    userId: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.createdAt,
  };
};


// ========================
// ✅ Login User Logic
// ========================
export const loginUser = async (email, password, role) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  console.log('User found in login:', user);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Password match result:', isMatch);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  if (role && user.role !== role) {
    throw new Error('Access denied for this role');
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
    }
  );

  return {
    token,
    refreshToken: 'mock-refresh-token',
    userId: user._id,
    role: user.role,
  };
};

// ========================
// ✅ Logout Logic
// ========================
export const logoutUser = async () => {
  return 'User logged out successfully';
};

// ========================
// ✅ Get User Profile
// ========================
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  console.log('✅ User Profile Fetched:', user);
  return user;
};

// ========================
// ✅ Get All Users
// ========================
export const getAllUsers = async () => {
  const users = await User.find().select('-password');
  if (!users || users.length === 0) {
    throw new Error('No users found');
  }
  return users;
};
