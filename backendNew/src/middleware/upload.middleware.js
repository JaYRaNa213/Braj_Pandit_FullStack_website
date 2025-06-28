// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// middleware/upload.middleware.js
// src/middleware/upload.middleware.js

// Import multer for file uploads
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Set destination folder for uploads
  },
  filename: (req, file, cb) => {
    // Create unique file name using current date and original name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Define file upload limits and types
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: (req, file, cb) => {
    // Validate file types (only images allowed)
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  },
});

// Middleware to handle single file upload
export const uploadSingle = (fieldName) => upload.single(fieldName);

// Middleware to handle multiple file uploads
export const uploadMultiple = (fieldName, maxCount) => upload.array(fieldName, maxCount);
