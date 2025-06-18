// ✅ src/pages/user/Checkout.jsx
import React, { useState } from 'react';
import { placeOrder } from '../../services/orderService';
import toast from 'react-hot-toast';

const Checkout = () => {
  const [shipping, setShipping] = useState({
    fullName: '',
    mobile: '',
    pincode: '',
    state: '',
    city: '',
    address: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cartItems] = useState([]); // TODO: Replace with actual cart context or service

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderItems = cartItems.map(item => ({
        product: item.productId,
        quantity: item.quantity
      }));
      const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

      const response = await placeOrder({
        orderItems,
        shippingAddress: shipping,
        paymentMethod,
        totalPrice,
      });

      if (response.success) toast.success('Order placed!');
      else toast.error(response.message);
    } catch (err) {
      toast.error('Order failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(shipping).map(([key, value]) => (
          <input
            key={key}
            type="text"
            required
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })}
            className="w-full p-2 border rounded"
          />
        ))}
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="online">Online</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;