import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAdminAuth } from '../pages/AdminAuthContext';
import '../css/AdminNavbar.css';

const AdminNavbar = () => {
  const { admin, logout } = useAdminAuth();

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-left">
        <span className="admin-logo">Admin Panel</span>
      </div>
      <nav className="admin-navbar-center">
        <NavLink to="/foods" className="admin-nav-link">
          Foods
        </NavLink>
        <NavLink to="/orders" className="admin-nav-link">
          Orders
        </NavLink>
      </nav>
      <div className="admin-navbar-right">
        {admin ? (
          <>
            <span className="admin-user">{admin.email}</span>
            <button
              type="button"
              className="admin-logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <span className="admin-user">Not logged in</span>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;

