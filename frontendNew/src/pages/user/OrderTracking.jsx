import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderTracking } from "../../services/user/userService";
import { Loader2 } from "lucide-react";

const STATUS_FLOW = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];

const OrderTracking = () => {
  const { id } = useParams();
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const res = await getOrderTracking(id);
        if (res.success) {
          setTracking(res.data);
        } else {
          setError(res.message || "Tracking not available");
        }
      } catch (err) {
        console.error("Error fetching tracking:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchTracking();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 flex items-center gap-2 text-[#C0402B]">
        <Loader2 className="animate-spin" /> Loading...
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  const currentIndex = STATUS_FLOW.findIndex(
    (status) => status.toLowerCase() === tracking.status.toLowerCase()
  );

  const product = tracking.product || {}; // fallback in case product is undefined

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-[#C0402B] dark:text-red-400">
        🚚 Order Tracking
      </h1>

      {/* Product Display */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <img
          src={product.image || "/default-product.png"}
          alt="Product"
          className="w-40 h-40 object-cover rounded-xl shadow border"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{product.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Tracking ID: <span className="font-medium">{id}</span></p>
        </div>
      </div>

      {/* Roadmap Tracker */}
      <div className="relative flex justify-between items-center mb-10">
        {STATUS_FLOW.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={index} className="flex flex-col items-center w-full text-center relative z-10">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold border-2
                  ${
                    isCompleted
                      ? "bg-green-600 text-white border-green-600"
                      : isCurrent
                      ? "bg-yellow-400 text-black border-yellow-500"
                      : "bg-gray-300 text-gray-700 border-gray-400"
                  }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  isCompleted || isCurrent
                    ? "text-[#C0402B] dark:text-red-400"
                    : "text-gray-500"
                }`}
              >
                {status}
              </span>
            </div>
          );
        })}

        {/* Connector line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-300 z-0">
          <div
            className="h-0.5 bg-green-600 transition-all duration-500"
            style={{
              width: `${(currentIndex / (STATUS_FLOW.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Timeline Details */}
      <div className="space-y-4">
        {tracking.history?.map((step, idx) => (
          <div key={idx} className="flex items-start space-x-4">
            <div className="mt-1 w-3 h-3 rounded-full bg-green-600"></div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {step.status}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(step.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
