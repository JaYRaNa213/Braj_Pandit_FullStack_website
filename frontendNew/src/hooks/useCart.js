// src/hooks/useCart.js
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../services/axios";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // 🔽 Load cart on mount
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const res = await axios.get("/cart");
          setCartItems(res.data?.items || []);
        } catch (err) {
          console.error("❌ Failed to fetch cart:", err);
        }
      } else {
        const local = localStorage.getItem("cart");
        if (local) setCartItems(JSON.parse(local));
      }
    };

    loadCart();
  }, [user]);

  // 🔼 Sync to localStorage or backend on change
  useEffect(() => {
    if (user) {
      axios
        .post("/cart", { items: cartItems })
        .catch((err) => console.error("❌ Failed to sync cart:", err));
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return { cartItems, addToCart, removeFromCart, clearCart };
};
