import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import '../css/AdminAuthPage.css';

const AdminLoginPage = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      navigate('/foods');
    } catch (err) {
      setError('Invalid admin credentials');
    }
  };

  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="admin-auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="admin-auth-error">{error}</p>}
          <button type="submit" className="admin-auth-btn">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLoginPage;

