// src/controllers/auth.controller.js
import { registerUser, loginUser, logoutUser } from '../services/auth.service.js';
import { getAllUsers, getUserProfile } from '../services/auth.service.js';

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
        _id: user.userId, // ✅ Return generated userId
        name: user.name,
        email: user.email,
        role: user.role, // ✅ Return user role
        createdAt: user.createdAt, // ✅ Return createdAt timestamp
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ========================
// ✅ Login Controller
// ========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, refreshToken, userId } = await loginUser(email, password); // ✅ Destructure userId

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      role,
      userId, // ✅ Return userId in response
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
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
    const userId = req.user.id; // Extracted from decoded JWT token
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
