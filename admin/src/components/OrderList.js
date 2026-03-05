import React from 'react';
import '../css/OrderList.css';

const OrderList = ({ orders, onStatusChange }) => {
  const statuses = ['Pending', 'Preparing', 'Delivered'];

  return (
    <div className="admin-orders-list">
      {orders.map((order) => (
        <div key={order._id} className="admin-order-card">
          <div className="admin-order-header">
            <span>Order #{order._id.slice(-6)}</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
          <div className="admin-order-user">
            <span>{order.userId?.name}</span>
            <span>{order.userId?.email}</span>
          </div>
          <div className="admin-order-items">
            {order.items.map((item, index) => (
              <div key={index} className="admin-order-item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="admin-order-footer">
            <span>Total: ${order.totalAmount.toFixed(2)}</span>
            <span>Payment: {order.paymentStatus}</span>
            <div className="admin-order-status">
              <label htmlFor={`status-${order._id}`}>Status</label>
              <select
                id={`status-${order._id}`}
                value={order.orderStatus}
                onChange={(e) => onStatusChange(order._id, e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;

