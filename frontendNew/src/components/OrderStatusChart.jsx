// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FFBB28', '#00C49F', '#FF8042', '#FF4F4F'];

const OrderStatusChart = ({ data }) => {
  const chartData = [
    { name: 'Pending', value: data.pendingOrders },
    { name: 'Confirmed', value: data.confirmedOrders },
    { name: 'Cancelled', value: data.cancelledOrders },
  ];

  return (
    <PieChart width={300} height={250}>
      <Pie
        data={chartData}
        cx={150}
        cy={120}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {chartData.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default OrderStatusChart;
