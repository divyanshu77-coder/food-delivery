import React from 'react';
import { Link } from 'react-router-dom';
import '../css/CheckoutResultPage.css';

const CheckoutSuccessPage = () => {
  return (
    <main className="checkout-result">
      <h2>Payment successful!</h2>
      <p>Your order has been placed. You can track it in your orders.</p>
      <div className="checkout-result-actions">
        <Link to="/orders">View Orders</Link>
        <Link to="/">Back to Home</Link>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;

