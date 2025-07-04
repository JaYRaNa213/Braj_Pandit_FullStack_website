// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { t } = useTranslation();

  // 🛡️ Safely calculate total
  const total = cartItems.reduce((acc, item) => {
    const price = item?.product?.price;
    const quantity = item?.quantity || 1;
    if (typeof price === "number") {
      return acc + price * quantity;
    }
    return acc;
  }, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen bg-[#fdf7e3] dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-3xl font-bold text-center text-red-700 dark:text-yellow-300 mb-8 flex items-center justify-center gap-2">
        <FaShoppingCart /> {t("cart.title")}
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600 dark:text-gray-400">
          {t("cart.empty")}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map((item, index) => {
              const product = item?.product;

              if (!product || typeof product.price !== "number") return null;

              return (
                <div
                  key={product._id || index}
                  className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md"
                >
                  <img
                    src={product.imageUrl || "/default-product.png"}
                    alt={product.name || "Product"}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-medium">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      ₹{product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(product._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-yellow-300 rounded hover:bg-yellow-400 dark:text-black"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-md font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product._id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-yellow-300 rounded hover:bg-yellow-400 dark:text-black"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={t("cart.remove")}
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Total and Checkout */}
          <div className="text-right mt-10">
            <p className="text-xl font-bold text-green-700 dark:text-green-300">
              {t("cart.total")}: ₹{total.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium shadow-lg"
            >
              {t("cart.checkout")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
