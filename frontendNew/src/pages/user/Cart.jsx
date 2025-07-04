// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    if (!cartItems.length) return;
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">🛒 {t("cart.heading")}</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          {t("cart.empty_message")}
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ₹{item.price} × {item.quantity || 1}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product)}
                  className="text-red-500 hover:underline text-sm"
                >
                  {t("cart.remove")}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {t("cart.total")}: ₹{total}
            </h2>
            <button
              onClick={handleCheckout}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              {t("cart.checkout")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
