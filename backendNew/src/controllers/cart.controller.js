// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Helper to check for valid MongoDB ObjectId
const isValidObjectId = mongoose.Types.ObjectId.isValid;

// ➕ Add to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (index !== -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    res.status(200).json({ success: true, message: "Product added to cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// 🛒 Get User Cart
export const getUserCart = async (req, res) => {
  const userId = req.user.id;

  if (!isValidObjectId(userId)) {
    return res
      .status(200)
      .json({ success: true, cart: { items: [] }, message: "Admin has no cart" });
  }

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// ✏️ Update Cart Item Quantity
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
    }

    res.status(200).json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// ❌ Remove Item from Cart
export const removeCartItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// 🔄 Sync Cart (localStorage → DB)
export const syncCart = async (req, res) => {
  const userId = req.user.id;

  if (!isValidObjectId(userId)) {
    return res
      .status(200)
      .json({ success: true, items: [], message: "Admin has no cart" });
  }

  try {
    const localCart = req.body.cart || [];
    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      userCart = new Cart({ user: userId, items: [] });
    }

    localCart.forEach((incomingItem) => {
      const existingItem = userCart.items.find(
        (i) => i.product.toString() === incomingItem.product
      );

      if (existingItem) {
        existingItem.quantity += incomingItem.quantity;
      } else {
        userCart.items.push({
          product: new mongoose.Types.ObjectId(incomingItem.product),
          quantity: incomingItem.quantity,
        });
      }
    });

    await userCart.save();
    const populatedCart = await userCart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Cart synced successfully",
      items: populatedCart.items,
    });
  } catch (err) {
    console.error("Cart sync failed:", err);
    res.status(500).json({ success: false, message: "Failed to sync cart" });
  }
};
