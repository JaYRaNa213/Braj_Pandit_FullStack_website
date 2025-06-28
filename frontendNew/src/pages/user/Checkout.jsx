// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/user/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeOrder } from '../../services/orderService';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FaShoppingBag, FaMoneyBillWave } from 'react-icons/fa';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: '',
    mobile: '',
    pincode: '',
    state: '',
    city: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const buyNowProduct = location.state?.product;

    if (buyNowProduct) {
      setItems([
        {
          product: buyNowProduct._id || buyNowProduct.id,
          name: buyNowProduct.name,
          price: buyNowProduct.price,
          quantity: 1,
          imageUrl: buyNowProduct.imageUrl || '/default-product.png',
        },
      ]);
    } else {
      if (user && cartItems.length > 0) {
        const mappedItems = cartItems.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          imageUrl: item.product.imageUrl || '/default-product.png',
        }));
        setItems(mappedItems);
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (localCart.length === 0) {
          toast.error('No items to checkout.');
          navigate('/');
        } else {
          const mappedItems = localCart.map((item) => ({
            product: item.product._id || item.product,
            name: item.product.name || item.name,
            price: item.product.price || item.price || 0,
            quantity: item.quantity || 1,
            imageUrl: item.product.imageUrl || item.imageUrl || '/default-product.png',
          }));
          setItems(mappedItems);
        }
      }
    }
  }, [location.state, user, cartItems, navigate]);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to place an order.');
      navigate('/login');
      return;
    }

    try {
      const productsPayload = items.map((item) => ({
        productId: item.product,
        quantity: item.quantity,
      }));

      const res = await placeOrder({
        products: productsPayload,
        address: shipping,
        paymentMethod,
      });

      if (res.success) {
        toast.success('✅ Order placed!');
        localStorage.removeItem('cart');
        clearCart(); // 🔥 clear context cart
        navigate('/my-orders');
      } else {
        toast.error(res.message || '❌ Order failed.');
      }
    } catch (err) {
      console.error('🔥 Order Error:', err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-gradient-to-tr from-white to-gray-100 rounded-2xl shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-6 flex items-center justify-center gap-2">
        <FaShoppingBag className="text-2xl" /> Checkout
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-lg text-red-500 font-semibold">
          No products to checkout.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left - Order Summary */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">🛒 Your Items</h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border bg-white rounded-xl shadow-sm"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h4 className="text-md font-medium">{item.name}</h4>
                    <p className="text-gray-600">
                      ₹{Number(item.price).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-4 text-xl font-bold text-green-700">
              Total: ₹
              {items
                .reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0)
                .toFixed(2)}
            </div>
          </div>

          {/* Right - Shipping & Payment */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold mb-2 border-b pb-2">📦 Shipping Details</h3>
            {Object.entries(shipping).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 capitalize mb-1">{key}</label>
                <input
                  name={key}
                  required
                  value={value}
                  onChange={handleChange}
                  placeholder={`Enter your ${key}`}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">💳 Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-red-500"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="online">Online Payment</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <FaMoneyBillWave className="inline mr-2" />
              Place Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
