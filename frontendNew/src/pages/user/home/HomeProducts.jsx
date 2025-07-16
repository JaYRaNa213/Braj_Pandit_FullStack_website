
// 🔐 Enhanced by ChatGPT © 2025 - Jay Rana's Devotional Platform - Premium Products Section

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProducts } from "../../../services/api";
import { useCart } from "../../../context/CartContext";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ShimmerProductCard = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="min-w-[280px] max-w-[280px] h-[380px] bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-orange-100 dark:border-gray-700 shadow-lg overflow-hidden"
  >
    <div className="relative">
      <div className="h-[180px] bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
      <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
    </div>
    <div className="p-4 space-y-3">
      <div className="w-4/5 h-4 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      <div className="w-2/3 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      <div className="flex gap-2">
        <div className="w-1/2 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
        <div className="w-1/2 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
      </div>
    </div>
  </motion.div>
);

const ProductCard = ({ product, onAddToCart, onBuyNow, onToggleFavorite, isFavorite, t, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!inView) return <div ref={ref} className="min-w-[280px] max-w-[280px] h-[380px]" />;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -12,
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.4 }
    }
  };

  const rating = 4.2 + Math.random() * 0.8;
  const discount = Math.floor(Math.random() * 30) + 10;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="min-w-[280px] max-w-[280px] flex-shrink-0 group cursor-pointer"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 dark:hover:shadow-yellow-500/20 transition-all duration-500 h-[380px] flex flex-col">
        
        {/* Image Container */}
        <div className="relative h-[180px] overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800">
          <motion.img
            src={product.imageUrl || "/default-product.png"}
            alt={product.name}
            variants={imageVariants}
            initial="hidden"
            animate={imageLoaded ? "visible" : "hidden"}
            whileHover="hover"
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "/default-product.png";
              setImageLoaded(true);
            }}
          />

          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product._id);
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:scale-110 transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isFavorite ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
          </motion.button>

          {/* Discount Badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
            {discount}% OFF
          </div>

          {/* Quick Actions Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-3">
              <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                👁️
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                🔄
              </button>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <Link to={`/products/${product._id}`}>
              <h3 className="text-base font-bold text-gray-800 dark:text-white line-clamp-2 leading-tight group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={12}
                    className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({rating.toFixed(1)})
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-orange-600 dark:text-yellow-400">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{Math.floor(product.price * (1 + discount / 100))}
              </span>
            </div>

            {/* Category Badge */}
            <div className="text-xs text-orange-600 dark:text-yellow-400 bg-orange-50 dark:bg-yellow-900/30 px-2 py-1 rounded-full inline-block">
              {product.category || "Spiritual"}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 px-3 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaShoppingCart size={10} />
              {t("products.add_to_cart")}
            </motion.button>
            
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onBuyNow(product);
              }}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-2 px-3 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaBolt size={10} />
              {t("products.buy_now")}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    getProducts()
      .then((res) => {
        const list = res?.data?.data;
        if (Array.isArray(list)) {
          setProducts(list.slice(0, 10));
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 dark:bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-200/20 dark:bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-100/10 to-yellow-100/10 dark:from-yellow-500/5 dark:to-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              🛍️ {t("products.heading_1")}{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {t("products.heading_2")}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover sacred items for your spiritual journey
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/products"
              className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("view_all")} 
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
                {[...Array(4)].map((_, i) => (
                  <ShimmerProductCard key={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!loading && products.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                {t("products.no_products")}
              </p>
              <p className="text-gray-500 dark:text-gray-500 mt-2">
                Check back later for new spiritual products
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence>
          {!loading && products.length > 0 && (
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Navigation Buttons */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20">
                <button
                  onClick={scrollLeft}
                  className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-xl rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <MdKeyboardArrowLeft size={24} />
                </button>
              </div>
              
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
                <button
                  onClick={scrollRight}
                  className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-xl rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <MdKeyboardArrowRight size={24} />
                </button>
              </div>

              {/* Products Container */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {products.map((product, index) => (
                  <div key={product._id} className="snap-start">
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onBuyNow={handleBuyNow}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites[product._id]}
                      t={t}
                      index={index}
                    />
                  </div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {products.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-orange-300 dark:bg-gray-600"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HomeProducts;
