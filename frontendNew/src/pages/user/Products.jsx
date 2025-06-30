// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = res.data?.data || [];
        setProducts(data);
        setFilteredProducts(data);

        const categories = ["All", ...new Set(data.map((p) => p.category || "Others"))];
        setCategoryList(categories);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (selectedCategory !== "All") {
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
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, product: product._id, quantity: 1 });
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 md:px-10">
      <h2 className="text-4xl font-bold text-center mb-6 text-red-700 dark:text-red-400 drop-shadow-md">
        🛍️ Our Divine <span className="text-yellow-600 dark:text-yellow-300">Products</span>
      </h2>

      <div className="max-w-6xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search divine products..."
            className="w-full py-3 pl-12 pr-4 rounded-full shadow-md border border-yellow-300 dark:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500 text-lg" />

          {searchTerm && (
            <ul className="absolute bg-white dark:bg-gray-700 border mt-2 w-full max-h-48 overflow-y-auto rounded-lg shadow-md z-10">
              {products
                .filter((p) =>
                  p.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 5)
                .map((p) => (
                  <li
                    key={p._id}
                    onClick={() => setSearchTerm(p.name)}
                    className="px-4 py-2 hover:bg-yellow-100 dark:hover:bg-yellow-900 cursor-pointer text-sm"
                  >
                    {p.name}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <select
          className="py-3 px-4 rounded-full border border-yellow-300 dark:border-yellow-500 shadow-md bg-white dark:bg-gray-800 dark:text-white text-sm"
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
          className="py-3 px-4 rounded-full border border-yellow-300 dark:border-yellow-500 shadow-md bg-white dark:bg-gray-800 dark:text-white text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-red-600 dark:text-red-400 text-lg mt-6">
          No matching products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 border border-yellow-300 dark:border-yellow-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden text-sm"
            >
              <img
                src={product.imageUrl || "/default-product.png"}
                alt={product.name}
                className="w-full h-36 object-cover"
              />

              <div className="flex flex-col justify-between p-3 flex-grow">
                <div>
                  <Link to={`/products/${product._id}`}>
                    <h3 className="text-base font-semibold text-red-800 dark:text-red-300 mb-1 hover:underline line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-700 dark:text-gray-300 text-xs mb-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-base font-bold text-yellow-700 dark:text-yellow-400">
                    ₹{product.price}
                  </p>
                </div>
              </div>

              <div className="px-3 pb-3 flex flex-col gap-2 mt-auto">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 rounded text-xs font-medium transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1.5 rounded text-xs font-medium transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;