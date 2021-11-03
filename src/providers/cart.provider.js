import React, { createContext, useState, useEffect } from 'react';
import {
  addItemToCart,
  filterItemFromCart,
  getCartItemCount,
  getCartItemTotal,
  removeItemFromCart,
} from './cart.utils';

export const CartContext = createContext({
  hidden: true,
  toggleCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
  cartItems: [],
  cartItemsCount: 0,
  total: 0,
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
  const toggleCart = () => setHidden(!hidden);
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const clearItem = (item) => setCartItems(filterItemFromCart(cartItems, item));

  useEffect(() => {
    setCartItemsCount(getCartItemCount(cartItems));
    setTotal(getCartItemTotal(cartItems));
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        hidden,
        cartItems,
        cartItemsCount,
        addItem,
        removeItem,
        toggleCart,
        clearItem,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
