import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import '../css/CheckoutPage.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { user, api } = useAuth();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      if (!stripe) {
        setToast({ message: 'Stripe is not configured', type: 'error' });
        setLoading(false);
        return;
      }

      const payloadItems = items.map((item) => ({
        foodId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const { data } = await api.post(
        '/create-checkout-session',
        { items: payloadItems },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id
      });

      if (error) {
        setToast({ message: error.message, type: 'error' });
      } else {
        clearCart();
      }
    } catch (error) {
      setToast({ message: 'Checkout failed', type: 'error' });
      navigate('/checkout-cancel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <p>Items: {items.length}</p>
        <p>Total: ${total.toFixed(2)}</p>
        <button
          type="button"
          className="checkout-btn"
          disabled={items.length === 0 || loading}
          onClick={handleCheckout}
        >
          {loading ? 'Redirecting...' : 'Pay with Card'}
        </button>
      </div>
      {loading && <Loader />}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </main>
  );
};

export default CheckoutPage;

