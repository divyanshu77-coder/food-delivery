import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../css/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Food<span>Delivery</span>
        </Link>
      </div>
      <nav className="navbar-center">
        <NavLink to="/" className="navbar-link">
          Home
        </NavLink>
        {user && (
          <NavLink to="/orders" className="navbar-link">
            Orders
          </NavLink>
        )}
      </nav>
      <div className="navbar-right">
        <NavLink to="/cart" className="navbar-cart">
          Cart ({cartCount})
        </NavLink>
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name}</span>
            <button type="button" className="navbar-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar-btn">
              Login
            </NavLink>
            <NavLink to="/register" className="navbar-btn secondary">
              Register
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

