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
        product: product._id,
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400 font-medium">Loading...</p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400 font-medium">Product not found.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow mt-10">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.imageUrl || "/default-product.png"}
          alt={product.name}
          className="w-full h-64 md:h-96 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-red-700 dark:text-yellow-400 mb-3">
              {product.name}
            </h2>
            <p className="text-gray-800 dark:text-gray-300 mb-3 text-sm leading-relaxed">
              {product.description}
            </p>
            <p className="text-green-700 dark:text-green-400 font-bold text-xl mb-6">
              ₹{product.price}
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded shadow"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
            >
              💰 Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
