// src/models/order.model.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
  totalAmount: Number,
  paymentStatus: { type: String, default: 'Pending' },
  orderStatus: { type: String, default: 'Processing' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
