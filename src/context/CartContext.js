import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      if (userInfo && userInfo.token) {
        try {
          const cart = await cartService.getCartItems(userInfo.token);
          setCartItems(cart.items || []);
        } catch (error) {
          console.error('Errore nel caricamento del carrello:', error);
          setCartItems([]);
        }
      }
    };

    loadCart();
  }, [userInfo]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      if (!userInfo) return;
      
      const updatedCart = await cartService.addCartItem(
        productId,
        quantity,
        userInfo.token
      );
      setCartItems(updatedCart.items || []);
    } catch (error) {
      console.error('Errore nell\'aggiunta al carrello:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (!userInfo) return;
      
      const updatedCart = await cartService.removeCartItem(productId, userInfo.token);
      setCartItems(updatedCart.items || []);
    } catch (error) {
      console.error('Errore nella rimozione dal carrello:', error);
    }
  };

  const clearCart = async () => {
    try {
      if (!userInfo) return;
      
      const result = await cartService.clearCart(userInfo.token);
      setCartItems([]);
    } catch (error) {
      console.error('Errore nello svuotamento del carrello:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,  
      cartItems: cartItems || [], 
      addToCart,
      removeFromCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);