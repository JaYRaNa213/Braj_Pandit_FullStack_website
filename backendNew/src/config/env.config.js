// Load environment variables from .env file
require("dotenv").config();

// Export environment variables for global access
module.exports = {
  // ✅ App port
  // PORT: process.env.PORT || 7000,

  // ✅ JWT settings
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  // ✅ Server base URL (used in emails, redirects, etc.)
  // BASE_URL: process.env.BASE_URL || "http://localhost:700",

  // ✅ Optional Payment API key
  PAYMENT_API_KEY: process.env.PAYMENT_API_KEY || "your_payment_api_key",

  // ✅ MongoDB URI
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/vrinda",

  // ✅ Cloudinary (if used)
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};
