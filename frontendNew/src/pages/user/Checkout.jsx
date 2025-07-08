// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeOrder } from '../../services/orderService';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FaShoppingBag, FaMoneyBillWave } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { t } = useTranslation();
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
      if (user && Array.isArray(cartItems) && cartItems.length > 0) {
        const mappedItems = cartItems.map((item) => {
          const prod = item.product || {};
          const isObject = typeof prod === 'object';

          return {
            product: isObject ? prod._id : prod,
            name: isObject ? prod.name : item.name || 'Unknown Product',
            price: isObject ? prod.price : item.price || 0,
            quantity: item.quantity || 1,
            imageUrl: isObject ? prod.imageUrl : item.imageUrl || '/default-product.png',
          };
        });
        setItems(mappedItems);
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (localCart.length === 0) {
          toast.error(t("checkout.empty"));
          navigate('/');
        } else {
          const mappedItems = localCart.map((item) => {
            const prod = item.product || {};
            const isObject = typeof prod === 'object';

            return {
              product: isObject ? prod._id : prod,
              name: isObject ? prod.name : item.name || 'Unknown Product',
              price: isObject ? prod.price : item.price || 0,
              quantity: item.quantity || 1,
              imageUrl: isObject ? prod.imageUrl : item.imageUrl || '/default-product.png',
            };
          });
          setItems(mappedItems);
        }
      }
    }
  }, [location.state, user, cartItems, navigate, t]);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error(t("checkout.loginRequired"));
      navigate('/login');
      return;
    }

    try {
      const productsPayload = items.map((item) => ({
        productId: typeof item.product === 'object' ? item.product._id : item.product,

        quantity: item.quantity,
      }));

      console.log("🛒 Submitting order payload:", {
        products: productsPayload,
        address: shipping,
        paymentMethod,
      });

      const res = await placeOrder({
        products: productsPayload,
        address: shipping,
        paymentMethod,
      });

      if (res.success) {
        toast.success(t("checkout.success"));
        localStorage.removeItem('cart');
        clearCart();
        navigate('/my-orders');
      } else {
        toast.error(res.message || t("checkout.fail"));
      }
    } catch (err) {
      console.error('🔥 Order Error:', err);
      toast.error(t("checkout.error"));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-gradient-to-tr from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl mt-10 text-black dark:text-white">
      <h2 className="text-3xl font-bold text-center text-red-700 dark:text-yellow-300 mb-6 flex items-center justify-center gap-2">
        <FaShoppingBag className="text-2xl" /> {t("checkout.title")}
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-lg text-red-500 dark:text-red-300 font-semibold">
          {t("checkout.empty")}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
              {t("checkout.items")}
            </h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h4 className="text-md font-medium">{item.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      ₹{Number(item.price).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-4 text-xl font-bold text-green-700 dark:text-green-300">
              {t("checkout.total")}: ₹
              {items
                .reduce(
                  (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
                  0
                )
                .toFixed(2)}
            </div>
          </div>

          {/* Shipping Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold mb-2 border-b pb-2 border-gray-300 dark:border-gray-600">
              {t("checkout.shipping")}
            </h3>
            {Object.entries(shipping).map(([key, value]) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300 capitalize mb-1"
                >
                  {t(`checkout.${key}`)}
                </label>
                <input
                  id={key}
                  name={key}
                  required
                  value={value}
                  onChange={handleChange}
                  placeholder={t(`checkout.placeholder.${key}`)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                {t("checkout.payment")}
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="cod">{t("checkout.cod")}</option>
                <option value="online">{t("checkout.online")}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <FaMoneyBillWave className="inline mr-2" />
              {t("checkout.button")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
