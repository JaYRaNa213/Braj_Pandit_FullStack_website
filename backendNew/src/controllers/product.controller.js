// src/controllers/product.controller.js

// // Mock database to store product data temporarily (replace with DB logic later)
// let products = [];


import Product from '../models/product.model.js';


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    // ✅ Delete local file after upload
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Delete even if failed
    return null;
  }
};

// 📌 Create Product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category = "General" } = req.body;

    // ✅ Validate fields
    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required including image",
      });
    }

    // ✅ Upload image to Cloudinary
    const uploadResult = await uploadOnCloudinary(req.file.path);
    if (!uploadResult || !uploadResult.secure_url) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // ✅ Create Product in DB
    const product = await Product.create({
      name,
      description,
      price,
      category,
      imageUrl: uploadResult.secure_url,
      createdBy: req.user._id, // 👤 only if admin logged in
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// 📌 Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find((p) => p.id == id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// 📌 Update Product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    // ✅ Prepare updated data
    let updatedData = {
      name,
      description,
      price,
      category,
      updatedBy: req.user._id,
    };

    // ✅ If new image is provided, upload to Cloudinary
    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResult || !cloudinaryResult.secure_url) {
        return res.status(400).json({
          success: false,
          message: 'Image upload failed',
        });
      }
      updatedData.imageUrl = cloudinaryResult.secure_url;
    }

    // ✅ Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// 📌 Delete Product by ID

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};