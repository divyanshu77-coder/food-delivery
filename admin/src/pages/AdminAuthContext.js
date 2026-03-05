import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext(null);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('fd_admin');
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.role !== 'admin') {
      throw new Error('Not an admin');
    }
    setAdmin(data);
    localStorage.setItem('fd_admin', JSON.stringify(data));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('fd_admin');
  };

  const value = { admin, login, logout, api };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

