import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then((res) => {
      if (res.success) setOrder(res.order);
    });
  }, [id]);

  if (!order) return <div className="p-4">Loading order...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-red-700 mb-4">🧾 Order Details</h2>

      <div className="mb-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> <span className="text-blue-700 font-medium">{order.status}</span></p>
        <p><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>
        <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>
      </div>

      <h3 className="text-xl font-semibold mb-2">📦 Products</h3>
      <ul className="space-y-3">
        {order.products.map((item) => (
          <li
            key={item.productId?._id}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
          >
            <img
              src={item.productId?.imageUrl || '/default-product.png'}
              alt={item.productId?.name}
              className="w-16 h-16 object-cover rounded border"
            />
            <div>
              <p className="font-medium">{item.productId?.name || 'Unnamed Product'}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.productId?.price?.toFixed(2) || 0}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button
          onClick={() => navigate('/my-orders')}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          ← Back to My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
