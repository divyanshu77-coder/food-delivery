import React from 'react';
import { Link } from 'react-router-dom';
import '../css/CheckoutResultPage.css';

const CheckoutCancelPage = () => {
  return (
    <main className="checkout-result">
      <h2>Payment cancelled</h2>
      <p>Your payment was not completed. You can try again or modify your cart.</p>
      <div className="checkout-result-actions">
        <Link to="/cart">Back to Cart</Link>
        <Link to="/">Back to Home</Link>
      </div>
    </main>
  );
};

export default CheckoutCancelPage;

