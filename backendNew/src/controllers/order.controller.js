// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.


//src/controllers/order.controller.js


import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

// ==========================
// ===== USER SIDE ==========
// ==========================

// 1. Place Order
export const placeOrder = async (req, res) => {
  try {
    const { products, address, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "No products to order" });
    }

    let totalPrice = 0;
    const populatedProducts = [];

    for (const p of products) {
      console.log("🔎 Looking for product ID:", p.productId || p.product);

      const prod = await Product.findById(p.productId || p.product);
      if (!prod) return res.status(404).json({ success: false, message: `Product not found: ${p.productId}` });
      totalPrice += prod.price * (p.quantity || 1);
      populatedProducts.push({
        productId: prod._id,
        quantity: p.quantity || 1
      });
    }

    const order = new Order({
      user: req.user.id,
      products: populatedProducts,
      address,
      paymentMethod: paymentMethod || "COD",
      status: "pending",
      totalAmount: totalPrice
    });

    await order.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2. Get My Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: "products.productId",
        select: "name price image",
        strictPopulate: false
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ getMyOrders failed:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch your orders" });
  }
};


// ==========================
// ===== ADMIN SIDE =========
// ==========================

// 3. Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate({
        path: "products.productId",
        select: "name price imageUrl",
        options: { strictPopulate: false }
      });

    console.log("Admin fetched orders:", orders.length); // Debug
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Admin get orders error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};


// 4. Get Single Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.productId", "name price image");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 5. Update Order Status (confirm, shipped, delivered, cancelled, refused)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled", "refused"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate("user", "name email")
      .populate("products.productId", "name price image");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 6. Cancel or Refuse Order (admin or optionally user)
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // Only allow cancellation if it's still pending or confirmed
    if (!["pending", "confirmed"].includes(order.status)) {
      return res.status(400).json({ success: false, message: "Cannot cancel at this stage" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
