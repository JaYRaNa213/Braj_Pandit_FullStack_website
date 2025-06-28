// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { getProducts } from "../../../services/api";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const HomeProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      product: product._id,
      quantity: 1,
    });
    toast.success("Added to cart!");
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (Array.isArray(res.data?.data)) {
          setProducts(res.data.data);
        } else {
          console.error("Unexpected products data", res.data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const featuredProducts = products.slice(0, 10); // Limit to 10 products

  return (
    <section
      id="products"
      className="py-16 bg-gradient-to-b from-red-50 via-yellow-50 to-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-12 drop-shadow-sm">
          Featured Religious <span className="text-yellow-600">Products</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : featuredProducts.length === 0 ? (
          <p className="text-center text-red-500">No products found.</p>
        ) : (
          <div
            className="grid 
              grid-cols-2 
              md:grid-cols-4 
              lg:grid-cols-5 
              gap-6"
          >
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border-2 border-yellow-400 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute top-3 right-3 text-red-600 text-xl hover:scale-110 transition"
                >
                  {favorites[product._id] ? <FaHeart /> : <FaRegHeart />}
                </button>

                {/* Product Image */}
                <img
                  src={product.imageUrl || "/default-product.png"}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />

                {/* Product Details */}
                <div className="flex flex-col justify-between p-4 flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-yellow-700">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                {/* Action Buttons at Bottom */}
                <div className="flex gap-2 px-4 pb-4 mt-auto">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More Button */}
        {products.length > 5 && (
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="px-6 py-2 border-2 border-red-700 text-red-700 rounded-full hover:bg-red-700 hover:text-white transition text-lg font-semibold shadow-md"
            >
              View More Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeProducts;
