import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AdminAuthProvider } from './pages/AdminAuthContext';
import './css/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

