// src/controllers/order.controller.js
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

import asyncHandler from "../utils/asyncHandler.js";

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity, 0
    );

    const order = await Order.create({
      user: req.user._id,
      products: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalAmount,
    });

    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({ success: true, message: 'Order placed', order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('products.product');
  res.status(200).json({ success: true, orders });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user').populate('products.product');
  res.status(200).json({ success: true, orders });
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.status(200).json({ success: true, message: 'Order status updated', order });
};




export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Fetched user orders",
    data: orders,
  });
});

