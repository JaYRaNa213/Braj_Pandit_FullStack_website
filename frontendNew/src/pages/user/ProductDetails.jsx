// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.


// src/pages/user/ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { useCart } from "../../hooks/useCart";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data?.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        product: product._id, // 🧠 key expected by Checkout
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1,
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      navigate("/checkout", {
        state: {
          product: {
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
          },
        },
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="mb-2 text-gray-700">{product.description}</p>
      <p className="text-green-700 font-bold text-lg mb-4">₹{product.price}</p>
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
