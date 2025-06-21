import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const products = [
  {
    id: "1",
    img: "/images/products/diwaliPujan.jpg",
    name: "Diwali Poojan Samagri",
    desc: "Diwali Poojan Samagri Including Most of the Products",
    price: 599,
  },
  {
    id: "2",
    img: "/images/products/gita.jpg",
    name: "Shrimad Bhagavad Gita",
    desc: "Sacred dialogue between Lord Krishna and Arjuna.",
    price: 499,
  },
  {
    id: "3",
    img: "/images/products/jhula.jpg",
    name: "Shree krishna Palna",
    desc: "Lokpriya Palna with Peacock style for Shree Krishna",
    price: 399,
  },
  {
    id: "4",
    img: "/images/products/premImage.jpg",
    name: "Tasveer & Posters",
    desc: "Poster and Tasveer Of Premanand Jee Maharaj",
    price: 199,
  },
  {
    id: "5",
    img: "/images/products/vstra.jpg",
    name: "Vastra Of Laddu Gopal Jee",
    desc: "Vastra Of laddu Gopal Jee",
    price: 50,
  },
  {
    id: "6",
    img: "/images/products/k2.jpg",
    name: "PALNA",
    desc: "Shree Krishna was Also love to sit in Palna",
    price: 149,
  },
  {
    id: "7",
    img: "/images/products/laddu.jpg",
    name: "Laddu Gopal Jee",
    desc: "Laddu Gopal Jee, it is the most Famous",
    price: 199,
  },
  {
    id: "8",
    img: "/images/products/tulashi.jpg",
    name: "Tulshi Mala",
    desc: "Krishna also love Tulshi Mala. It represents the devotees.",
    price: 199,
  },
];
const HomeProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-red-50 via-yellow-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
          Featured Religious <span className="text-yellow-600">Products</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.desc}</p>
                <p className="text-lg font-bold text-red-500 mb-4">₹{product.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart({ ...product, quantity: 1, product: product.id })}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg"
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

        <div className="text-center mt-12">
          <a
            href="/products"
            className="px-6 py-2 border-2 border-red-600 rounded-full text-red-600 hover:bg-red-50 transition text-lg font-medium"
          >
            View More Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;