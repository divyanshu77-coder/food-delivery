import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import AdminLoginPage from './pages/AdminLoginPage';
import FoodsPage from './pages/FoodsPage';
import OrdersPage from './pages/OrdersPage';
import { useAdminAuth } from './pages/AdminAuthContext';

const PrivateRoute = ({ children }) => {
  const { admin } = useAdminAuth();
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <div className="admin-app-root">
      <AdminNavbar />
      <main className="admin-app-content">
        <Routes>
          <Route path="/login" element={<AdminLoginPage />} />
          <Route
            path="/foods"
            element={
              <PrivateRoute>
                <FoodsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrdersPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/foods" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

