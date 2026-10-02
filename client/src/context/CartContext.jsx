import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'quickcart_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync cart items to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // Add item to cart with stock validation
  const addToCart = (product, quantity = 1) => {
    if (!product || product.stock <= 0) {
      return { success: false, message: 'Item is currently out of stock.' };
    }

    let message = 'Added to cart';
    let reachedLimit = false;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item._id === product._id);

      if (existingIndex > -1) {
        const existing = prev[existingIndex];
        const newQuantity = existing.quantity + quantity;

        if (newQuantity > product.stock) {
          reachedLimit = true;
          message = `Only ${product.stock} items available in stock. Cart updated to max limit.`;
        }

        const clampedQuantity = Math.min(newQuantity, product.stock);

        const updated = [...prev];
        updated[existingIndex] = {
          ...existing,
          quantity: clampedQuantity,
          stock: product.stock, // ensure latest stock is captured
          price: product.price,
        };
        return updated;
      } else {
        const clampedQuantity = Math.min(quantity, product.stock);
        if (quantity > product.stock) {
          reachedLimit = true;
          message = `Only ${product.stock} items available in stock. Added maximum available.`;
        }
        return [
          ...prev,
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock,
            category: product.category,
            quantity: clampedQuantity,
          },
        ];
      }
    });

    return {
      success: true,
      message,
      reachedLimit,
    };
  };

  // Update item quantity strictly between 1 and available stock
  const updateQuantity = (productId, requestedQty) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item._id === productId) {
          // Clamp quantity between 1 and item.stock
          const clamped = Math.max(1, Math.min(requestedQty, item.stock));
          return { ...item, quantity: clamped };
        }
        return item;
      });
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  // Clear entire cart (used after successful checkout)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Total quantity of items in cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Subtotal in INR
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
