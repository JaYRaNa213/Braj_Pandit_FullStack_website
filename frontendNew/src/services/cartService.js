import axiosInstance from "./axios";

// ✅ Get logged-in user's cart
export const getCart = async () => {
  const res = await axiosInstance.get("/cart");
  return res.data.items || [];
};

// ✅ Sync entire cart to backend (replaces existing cart)
export const syncCart = async (items) => {
  const res = await axiosInstance.put("/cart/sync", { items }); // ✅ Correct route
  return res.data;
};


// ✅ Remove single item from cart
export const removeCartItem = async (productId) => {
  const res = await axiosInstance.delete(`/cart/${productId}`);
  return res.data;
};

// ✅ Clear entire cart
export const clearCart = async () => {
  const res = await axiosInstance.delete("/cart/clear");
  return res.data;
};
