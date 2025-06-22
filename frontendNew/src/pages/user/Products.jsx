import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Hook to navigate to checkout

  // ✅ Fetch all products from backend
  useEffect(() => {
    getProducts()
      .then((res) => {
        if (Array.isArray(res.data?.data)) {
          setProducts(res.data.data);
        } else {
          console.error("Product response is not an array:", res.data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Buy Now button click handler
  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } }); // ✅ Pass product to Checkout page
  };

  return (
    <div className="min-h-screen bg-[#fdf4e3] py-10 px-4 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#4A1C1C]">
        🛍️ Our Divine Products
      </h2>

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading products...</div>
      ) : products.length === 0 ? (
        <p className="text-center text-red-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-[#e0c097]"
            >
              <Link to={`/products/${product._id}`}>
                <h3 className="text-xl font-semibold mb-2 text-[#4A1C1C] hover:underline">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">{product.description}</p>
              <p className="text-green-700 font-bold text-lg">₹{product.price}</p>

              <button
                onClick={() => handleBuyNow(product)} // ✅ Button now works
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <FaShoppingCart /> Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
