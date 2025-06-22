import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { getProducts } from "../../../services/api";
import { toast } from "react-toastify";

const HomeProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const featuredProducts = products.slice(0, 8); // ✅ Show only first 8

  return (
    <section className="py-16 bg-gradient-to-b from-red-50 via-yellow-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
          Featured Religious <span className="text-yellow-600">Products</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : featuredProducts.length === 0 ? (
          <p className="text-center text-red-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden"
              >
                <img
                  src={product.imageUrl || "/default-product.png"}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-red-500 mb-4">
                    ₹{product.price}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-black py-2 px-4 rounded-lg"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More Button (only if more than 8 products exist) */}
        {products.length > 8 && (
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="px-6 py-2 border-2 border-red-600 rounded-full text-red-600 hover:bg-red-50 transition text-lg font-medium"
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
