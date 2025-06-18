// ✅ src/pages/user/OrderDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then(res => {
      if (res.success) setOrder(res.order);
    });
  }, [id]);

  if (!order) return <div className="p-4">Loading order...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <p>Status: {order.status}</p>
      <p>Total: ₹{order.totalAmount}</p>
      <ul>
        {order.products.map(item => (
          <li key={item.productId._id}>{item.productId.name} x {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;