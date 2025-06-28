// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../services/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (token) {
          const res = await axiosInstance.get("/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems(res.data.cart?.items || []);
        } else {
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
          setCartItems(localCart);
        }
      } catch (err) {
        console.error("❌ Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  const addToCart = async (product) => {
    const payload = { productId: product._id, quantity: 1 };

    try {
      if (token) {
        await axiosInstance.post("/cart/add", payload);
        const res = await axiosInstance.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.cart?.items || []);
      } else {
        setCartItems((prev) => {
          const existing = prev.find((i) => i.product._id === product._id);
          if (existing) {
            return prev.map((i) =>
              i.product._id === product._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            );
          }
          return [...prev, { product, quantity: 1 }];
        });
      }
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (token) {
        await axiosInstance.put("/cart/update", { productId, quantity });
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error("❌ Update quantity failed:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (token) {
        await axiosInstance.delete("/cart/remove", {
          data: { productId },
        });
      }

      setCartItems((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
    } catch (err) {
      console.error("❌ Remove from cart failed:", err);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
