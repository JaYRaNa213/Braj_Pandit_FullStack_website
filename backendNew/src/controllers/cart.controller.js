// src/controllers/cart.controller.js
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

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

export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

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

export const removeCartItem = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { product: productId } } },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Item removed', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const syncCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const items = req.body.items;

    // Replace user's cart with new items
    await Cart.findOneAndUpdate(
      { user: userId },
      { items },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Cart synced successfully" });
  } catch (err) {
    console.error("Cart sync failed:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

