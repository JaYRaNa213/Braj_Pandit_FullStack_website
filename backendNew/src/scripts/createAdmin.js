// scripts/createAdmin.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI); // use your DB URI

const adminExists = await User.findOne({ email: "jayrana0909@gmail.com" });

if (!adminExists) {
  const hashedPassword = await bcrypt.hash("Jay2002@", 10);

  await User.create({
    name: "Super Admin",
    email: "jayrana0909@gmail.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin user created");
} else {
  console.log("⚠️ Admin already exists");
}

await mongoose.disconnect();
