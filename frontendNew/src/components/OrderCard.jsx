
// src/components/OrderCard.jsx

const OrderCard = ({ order }) => (
  <div className="border p-4 mb-4 rounded shadow">
    <p><strong>Order ID:</strong> {order._id}</p>
    <p><strong>Status:</strong> {order.status}</p>
    <p><strong>Items:</strong> {order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</p>
    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
    <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
  </div>
);
export default OrderCard;
