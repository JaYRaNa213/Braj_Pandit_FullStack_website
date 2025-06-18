//src/pages/user/ProductDetails.jsx



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/products/${id}`)
      .then(res => setProduct(res.data?.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="mb-2">{product.description}</p>
      <p className="text-green-700 font-bold text-lg mb-4">₹{product.price}</p>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;