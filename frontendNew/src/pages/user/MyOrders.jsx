// src/pages/user/MyOrders.jsx

import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../../services/orderService';
import OrderCard from '../../components/OrderCard';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.orders || []);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-700">
        🧾 My Orders
      </h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
