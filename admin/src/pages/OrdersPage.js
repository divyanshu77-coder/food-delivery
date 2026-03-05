import React, { useEffect, useState } from 'react';
import { useAdminAuth } from './AdminAuthContext';
import OrderList from '../components/OrderList';
import '../css/AdminOrdersPage.css';

const OrdersPage = () => {
  const { admin, api } = useAdminAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders/admin', {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      setOrders(data);
    } catch (error) {
      // handle
    }
  };

  useEffect(() => {
    fetchOrders();
   
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(
        `/orders/${id}/status`,
        { orderStatus: status },
        {
          headers: { Authorization: `Bearer ${admin.token}` }
        }
      );
      await fetchOrders();
    } catch (error) {
      // handle
    }
  };

  return (
    <div className="admin-orders-page">
      <h2>Orders</h2>
      <OrderList orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default OrdersPage;

