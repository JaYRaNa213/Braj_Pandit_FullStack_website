import mongoose from "mongoose";
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

// ➕ Add to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const index = cart.items.findIndex(item => item.product.toString() === productId);
      if (index !== -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    res.status(200).json({ success: true, message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 🛒 Get User Cart
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// ✏️ Update Item Quantity
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
    }

    res.status(200).json({ success: true, message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// ❌ Remove Cart Item
export const removeCartItem = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { product: productId } } },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Item removed', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 🔄 Sync Cart from localStorage to MongoDB
export const syncCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const localCart = req.body.cart || [];

    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      userCart = new Cart({ user: userId, items: [] });
    }

    localCart.forEach((incomingItem) => {
      const existingItem = userCart.items.find((i) =>
        i.product.toString() === incomingItem.product
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
