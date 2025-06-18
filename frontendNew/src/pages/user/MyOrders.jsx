//src/pages/user/MyOrders.jsx

import React, { useEffect, useState } from 'react';
import { getMyOrders } from '@/services/orderService'; // API call
import OrderCard from '@/components/OrderCard';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default MyOrders;
