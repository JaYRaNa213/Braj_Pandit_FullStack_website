// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// // src/hooks/useCart.js
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import {
//   getCart,
//   syncCart,
//   removeCartItem as removeCartItemAPI,
//   clearCart as clearCartAPI,
// } from "../services/cartService";

// export const useCart = () => {
//   const { user } = useAuth();
//   const [cartItems, setCartItems] = useState([]);

//   // 🔽 Load cart on mount
//   useEffect(() => {
//     const load = async () => {
//       if (user) {
//         try {
//           const data = await getCart();
//           setCartItems(data);
//         } catch (err) {
//           console.error("Failed to load cart:", err);
//         }
//       } else {
//         const local = localStorage.getItem("cart");
//         if (local) setCartItems(JSON.parse(local));
//       }
//     };
//     load();
//   }, [user]);

//   // 🔼 Sync to backend or localStorage
//   useEffect(() => {
//     if (user) {
//       syncCart(cartItems).catch((err) =>
//         console.error("Cart sync failed:", err)
//       );
//     } else {
//       localStorage.setItem("cart", JSON.stringify(cartItems));
//     }
//   }, [cartItems, user]);

//   // ✅ Add item (merge quantity if exists)
//   const addToCart = (item) => {
//     setCartItems((prev) => {
//       const exists = prev.find((i) => i.product === item.product);
//       if (exists) {
//         return prev.map((i) =>
//           i.product === item.product
//             ? { ...i, quantity: i.quantity + (item.quantity || 1) }
//             : i
//         );
//       }
//       return [...prev, { ...item, quantity: item.quantity || 1 }];
//     });
//   };

//   // ✅ Remove item
//   const removeFromCart = async (productId) => {
//     if (user) {
//       try {
//         await removeCartItemAPI(productId);
//       } catch (err) {
//         console.error("Backend remove failed:", err);
//       }
//     }
//     setCartItems((prev) => prev.filter((item) => item.product !== productId));
//   };

//   // ✅ Clear all
//   const clearCart = async () => {
//     if (user) {
//       try {
//         await clearCartAPI();
//       } catch (err) {
//         console.error("Backend clear failed:", err);
//       }
//     }
//     setCartItems([]);
//   };

//   return { cartItems, addToCart, removeFromCart, clearCart };
// };



//src/hooks/useCart.js
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCart,
  syncCart,
  removeCartItem as removeCartItemAPI,
  clearCart as clearCartAPI,
} from "../services/cartService";

export const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (user) {
        try {
          const data = await getCart();
          setCartItems(data);
        } catch (err) {
          console.error("Failed to load cart:", err);
        }
      } else {
        const local = localStorage.getItem("cart");
        if (local) setCartItems(JSON.parse(local));
      }
    };
    load();
  }, [user]);

  useEffect(() => {
    if (user) {
      syncCart(cartItems).catch((err) =>
        console.error("Cart sync failed:", err)
      );
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.product === item.product);
      if (exists) {
        return prev.map((i) =>
          i.product === item.product
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = async (productId) => {
    if (user) {
      try {
        await removeCartItemAPI(productId);
      } catch (err) {
        console.error("Backend remove failed:", err);
      }
    }
    setCartItems((prev) => prev.filter((item) => item.product !== productId));
  };

  const clearCart = async () => {
    if (user) {
      try {
        await clearCartAPI();
      } catch (err) {
        console.error("Backend clear failed:", err);
      }
    }
    setCartItems([]);
  };

  return { cartItems, addToCart, removeFromCart, clearCart };
};
