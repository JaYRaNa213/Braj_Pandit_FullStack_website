// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../../services/orderService';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.orders || []);
      } catch (error) {
        console.error('❌ Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Loader2 className="w-6 h-6 mr-2 animate-spin text-red-600" />
        <p className="text-gray-600 dark:text-gray-300 text-lg animate-pulse">
          ⏳ {t('myOrders.loading')}
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
        <div className="text-center">
          <p className="text-2xl text-red-600 dark:text-red-400 font-semibold">
            🙁 {t('myOrders.noOrders')}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t('myOrders.startShopping')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-700 dark:text-yellow-400">
            🧾 {t('myOrders.title')}
          </h2>
          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en')
            }
            className="text-sm px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
          >
            {i18n.language === 'en' ? 'हिंदी में देखें' : 'View in English'}
          </button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-md border-l-4 border-[#C0402B] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {t('myOrders.order')} #{order._id.slice(-6)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  {t('myOrders.status')}: {t(`orderStatus.${order.status.toLowerCase()}`)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => navigate(`/orders/${order._id}/tracking`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
                >
                  📍 {t('myOrders.track')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
