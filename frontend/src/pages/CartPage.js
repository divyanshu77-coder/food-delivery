import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../css/CartPage.css';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <h2>Your cart is empty</h2>
        <Link to="/" className="cart-back-link">
          Browse foods
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-grid">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, Number(e.target.value))
                  }
                />
                <button
                  type="button"
                  className="cart-remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Summary</h3>
          <p>Total: ${total.toFixed(2)}</p>
          <button
            type="button"
            className="cart-checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;

