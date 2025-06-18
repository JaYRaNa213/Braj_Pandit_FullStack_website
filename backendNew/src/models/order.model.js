// models/order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Properly structured embedded address object
  address: {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },

  products: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
  },
],

  totalAmount: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ["cod", "online"],
    default: "cod",
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
}, {
  timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
