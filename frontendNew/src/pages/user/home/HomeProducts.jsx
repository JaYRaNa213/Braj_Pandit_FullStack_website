// 🔐 Redesigned by ChatGPT © 2025 - Jay Rana's Devotional Platform

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProducts } from "../../../services/api";
import { useCart } from "../../../context/CartContext";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const HomeProducts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      product: product._id,
      quantity: 1,
    });
    toast.success(t("products.added_to_cart"));
  };

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    getProducts()
      .then((res) => {
        const list = res?.data?.data;
        if (Array.isArray(list)) {
          setProducts(list.slice(0, 10)); // max 10 featured
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            {t("products.heading_1")}{" "}
            <span className="text-red-600">{t("products.heading_2")}</span>
          </h2>
          <Link
            to="/products"
            className="text-sm font-medium text-red-600 hover:underline"
          >
            {t("view_all")}
          </Link>
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow p-2 hover:scale-110 transition"
        >
          <MdKeyboardArrowLeft size={28} />
        </button>
        <button
          onClick={scrollRight}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow p-2 hover:scale-110 transition"
        >
          <MdKeyboardArrowRight size={28} />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
        >
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">
              {t("products.loading")}
            </p>
          ) : products.length === 0 ? (
            <p className="text-red-500 dark:text-red-300">
              {t("products.no_products")}
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="min-w-[160px] max-w-[180px] flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-4 relative"
              >
                {/* Favorite Toggle */}
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute top-2 right-2 text-red-600 dark:text-orange-400 text-sm"
                >
                  {favorites[product._id] ? <FaHeart /> : <FaRegHeart />}
                </button>

                {/* Product Image */}
                <img
                  src={product.imageUrl || "/default-product.png"}
                  alt={product.name}
                  className="h-28 w-full object-contain rounded-lg mb-3"
                />

                {/* Name */}
                <h3 className="text-sm font-medium text-center text-gray-800 dark:text-white line-clamp-2">
                  {product.name}
                </h3>

                {/* Price */}
                <p className="text-center text-red-600 font-bold text-sm mt-1">
                  ₹{product.price}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-2 mt-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white py-1.5 rounded-full font-semibold transition"
                  > 
                    {t("products.add_to_cart")}
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="text-xs bg-white dark:bg-gray-700 text-red-600 border border-red-600 rounded-full py-1.5 font-semibold transition hover:bg-gray-100"
                  >
                     {t("products.buy_now")}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;
