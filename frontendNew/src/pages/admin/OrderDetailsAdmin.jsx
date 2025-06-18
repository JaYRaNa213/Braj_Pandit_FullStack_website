// ✅ src/pages/admin/OrderDetailsAdmin.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../../services/admin/adminService';

const OrderDetailsAdmin = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then(res => {
      if (res.success) setOrder(res.order);
    });
  }, [id]);

  const handleStatusUpdate = async (e) => {
    const status = e.target.value;
    await updateOrderStatus(id, status);
    const res = await getOrderById(id);
    if (res.success) setOrder(res.order);
  };

  if (!order) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Order #{id}</h2>
      <p>User: {order.user?.name}</p>
      <p>Status:
        <select value={order.status} onChange={handleStatusUpdate}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </p>
      <ul className="mt-4">
        {order.products.map((item) => (
          <li key={item.productId._id}>
            {item.productId.name} x {item.quantity} (₹{item.productId.price})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailsAdmin;