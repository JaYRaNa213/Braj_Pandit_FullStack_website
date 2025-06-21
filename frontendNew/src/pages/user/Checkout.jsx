import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeOrder } from '../../services/orderService';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Checkout = () => {
  const { user } = useAuth();
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
          product: buyNowProduct._id || buyNowProduct.id || 'demo-id',
          name: buyNowProduct.name,
          price: buyNowProduct.price,
          quantity: 1,
        },
      ]);
    } else {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      if (storedCart.length === 0) {
        toast.error('No items to checkout.');
        navigate('/');
      } else {
        setItems(storedCart);
      }
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to place an order.");
      navigate("/login");
      return;
    }

    try {
      const orderItems = items.map(item => ({
        product: item.product,
        quantity: item.quantity,
      }));

      const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const res = await placeOrder({
        orderItems,
        shippingAddress: shipping,
        paymentMethod,
        totalPrice,
      });

      if (res.success) {
        toast.success('✅ Order placed!');
        localStorage.removeItem('cart');
        navigate('/my-orders');
      } else {
        toast.error(res.message || '❌ Order failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {items.length === 0 ? (
        <p className="text-red-600">No products to checkout.</p>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between mb-1">
                <span>{item.name}</span>
                <span>₹{item.price} x {item.quantity}</span>
              </div>
            ))}
            <div className="font-bold mt-2 border-t pt-2 text-right">
              Total: ₹{items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries(shipping).map(([key, value]) => (
              <input
                key={key}
                name={key}
                required
                value={value}
                onChange={handleChange}
                placeholder={key[0].toUpperCase() + key.slice(1)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            ))}

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
