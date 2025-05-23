// src/services/auth.service.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// In-memory user DB for demo
const users = [];

// ========================
// ✅ Register User Logic
// ========================
export const registerUser = async (userData) => {
  const { name, email, password ,role} = userData;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = Date.now().toString(); // ✅ Unique user ID

  const newUser = {
    userId, 
    name, 
    email,  
    role,
    password: hashedPassword,}; 
  // ✅ Default role added - > role: "user"
  // ✅ Add user to in-memory DB

  users.push(newUser);

  console.log('✅ New User Registered:', newUser);
  return newUser;
};

// ========================
// ✅ Login User Logic
// ========================
export const loginUser = async (email, password) => {
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      id: user.userId.toString(),
      email: user.email,
      role: user.role, // ✅ Include role in JWT
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
    }
  );

  // ✅ Return userId and role with tokens
  return {
    token,
    refreshToken: 'mock-refresh-token', // Optional enhancement
    userId: user.userId,
    role: user.role, // ✅ Include role in response
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
  const user = users.find((user) => user.userId.toString() === userId);
  if (!user) {
    throw new Error('User not found');
  }

  const { password, ...userWithoutPassword } = user;
  console.log('✅ User Profile Fetched:', userWithoutPassword);
  return userWithoutPassword;
};

// ========================
// ✅ Get All Users
// ========================
export const getAllUsers = async () => {
  if (users.length === 0) {
    throw new Error('No users found');
  }

  return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
};
