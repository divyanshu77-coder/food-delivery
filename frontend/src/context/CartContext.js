import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (food) => {
    setItems((prev) => {
      const existing = prev.find((item) => item._id === food._id);
      if (existing) {
        return prev.map((item) =>
          item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item._id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

