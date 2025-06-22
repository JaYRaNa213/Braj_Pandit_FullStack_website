// src/pages/user/CartPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-[#fdf7e3] min-h-screen">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-8 flex items-center justify-center gap-2">
        <FaShoppingCart /> Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          Your cart is empty. Go add some divine products!
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md"
              >
                <img
                  src={item.imageUrl || item.img || "/default-product.png"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-medium">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-yellow-300 rounded hover:bg-yellow-400"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-md font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-yellow-300 rounded hover:bg-yellow-400"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Total and Checkout */}
          <div className="text-right mt-10">
            <p className="text-xl font-bold text-green-700">
              Total: ₹{total.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
