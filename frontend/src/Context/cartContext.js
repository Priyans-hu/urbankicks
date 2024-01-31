import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const [cartItems, setCartItems] = useState(storedCartItems);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        const existingItem = cartItems.find((existingItem) => existingItem._id === item._id);

        if (existingItem) {
            // If the item already exists, update its quantity instead of adding a new one
            setCartItems((prevCartItems) =>
                prevCartItems.map((cartItem) =>
                    cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
                )
            );
        } else {
            // If the item doesn't exist, add it to the cart with a quantity of 1
            setCartItems((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        calculateTotal,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };