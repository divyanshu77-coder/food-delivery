import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import '../css/OrdersPage.css';

const OrdersPage = () => {
  const { user, api } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders/user', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(data);
    } catch (error) {
      // silent fail for now, could add toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
 
  }, []);

  return (
    <main className="orders-page">
      <h2>Your Orders</h2>
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span>Order #{order._id.slice(-6)}</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span>Total: ${order.totalAmount.toFixed(2)}</span>
                <span>Status: {order.orderStatus}</span>
                <span>Payment: {order.paymentStatus}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default OrdersPage;

