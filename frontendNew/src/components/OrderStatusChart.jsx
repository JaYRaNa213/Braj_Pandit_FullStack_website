// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ['#FFBB28', '#00C49F', '#FF8042', '#FF4F4F'];

const OrderStatusChart = ({ data }) => {
  const chartData = [
    { name: 'Pending', value: data?.pendingOrders || 0 },
    { name: 'Confirmed', value: data?.confirmedOrders || 0 },
    { name: 'Cancelled', value: data?.cancelledOrders || 0 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md text-gray-800 dark:text-gray-100">
      <h2 className="text-center text-lg font-semibold mb-4">📊 Order Status Overview</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={chartData}
          cx={150}
          cy={120}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#333', border: 'none', color: 'white' }}
          labelStyle={{ color: 'white' }}
          wrapperStyle={{ zIndex: 50 }}
        />
        <Legend
          wrapperStyle={{ color: 'inherit' }}
        />
      </PieChart>
    </div>
  );
};

export default OrderStatusChart;
