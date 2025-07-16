
// 🔐 Enhanced by ChatGPT © 2025 - Jay Rana's Devotional Platform - Premium Products Page

import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import { FaShoppingCart, FaSearch, FaFilter, FaHeart, FaRegHeart, FaStar, FaBolt, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product, onAddToCart, onBuyNow, onToggleFavorite, isFavorite, t }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rating = 4.2 + Math.random() * 0.8;
  const discount = Math.floor(Math.random() * 30) + 10;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 dark:hover:shadow-yellow-500/20 transition-all duration-500 group"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800">
        <motion.img
          src={product.imageUrl || "/default-product.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
          {discount}% OFF
        </div>

        {/* Favorite Button */}
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(product._id);
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:scale-110 transition-all duration-200 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFavorite ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
        </motion.button>

        {/* Quick Actions */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-3">
            <Link to={`/products/${product._id}`}>
              <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20">
                <FaEye size={16} />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2 leading-tight group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={14}
                className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-orange-600 dark:text-yellow-400">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{Math.floor(product.price * (1 + discount / 100))}
          </span>
        </div>

        {/* Category */}
        <div className="text-xs text-orange-600 dark:text-yellow-400 bg-orange-50 dark:bg-yellow-900/30 px-2 py-1 rounded-full inline-block">
          {product.category || "Spiritual"}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3">
          <motion.button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaShoppingCart size={12} />
            {t("AllProducts.addToCart")}
          </motion.button>
          
          <motion.button
            onClick={() => onBuyNow(product)}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaBolt size={12} />
            {t("AllProducts.buyNow")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(t("AllProducts.all"));
  const [sortBy, setSortBy] = useState("");
  const [favorites, setFavorites] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = res.data?.data || [];
        setProducts(data);
        setFilteredProducts(data);

        const categories = [t("AllProducts.all"), ...new Set(data.map((p) => p.category || t("AllProducts.others")))];
        setCategoryList(categories);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        toast.error(t("AllProducts.error"));
      });
  }, [t]);

  useEffect(() => {
    let temp = [...products];

    if (selectedCategory !== t("AllProducts.all")) {
      temp = temp.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      temp = temp.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
      );
    }

    if (sortBy === "priceLowHigh") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
  }, [products, searchTerm, selectedCategory, sortBy, t]);

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, product: product._id, quantity: 1 });
    toast.success(t("AllProducts.addedToCart"));
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-center mb-8 bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent"
          >
            🛍️ {t("AllProducts.ourDivine")} <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">{t("AllProducts.products")}</span>
          </motion.h1>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("AllProducts.searchPlaceholder")}
                className="w-full py-3 pl-12 pr-4 rounded-full shadow-lg border border-orange-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white bg-white"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 text-lg" />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors shadow-lg"
              >
                <FaFilter />
                Filters
              </button>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap justify-center gap-4 overflow-hidden"
                >
                  <select
                    className="py-2 px-4 rounded-full border border-orange-200 dark:border-gray-600 shadow-md bg-white dark:bg-gray-700 dark:text-white text-sm min-w-[150px]"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categoryList.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <select
                    className="py-2 px-4 rounded-full border border-orange-200 dark:border-gray-600 shadow-md bg-white dark:bg-gray-700 dark:text-white text-sm min-w-[150px]"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="">{t("AllProducts.sortBy")}</option>
                    <option value="priceLowHigh">{t("AllProducts.priceLowHigh")}</option>
                    <option value="priceHighLow">{t("AllProducts.priceHighLow")}</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-2">
              {t("AllProducts.noProducts")}
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search or filters
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites[product._id]}
                  t={t}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
