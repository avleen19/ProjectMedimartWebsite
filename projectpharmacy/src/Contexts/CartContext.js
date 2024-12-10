import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };
    const updateQuantity = (itemId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
