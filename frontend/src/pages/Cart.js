import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cartApi from '../api/cartApi';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await cartApi.getCartByUserId(userId);
                setCartItems(response.data.items);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleRemoveItem = async (itemId) => {
        try {
            await cartApi.removeItemFromCart(userId, itemId);
            setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleBuyNow = async () => {
        // Implement buy now functionality
        // For example, navigate to a checkout page with the cart items
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            await cartApi.updateItemQuantity(userId, itemId, newQuantity);
            setCartItems(cartItems.map(item => item._id === itemId ? { ...item, quantity: newQuantity } : item));
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const incrementQuantity = async (itemId) => {
        const item = cartItems.find((item) => item._id === itemId);
        const newQuantity = item.quantity + 1;
        await handleQuantityChange(itemId, newQuantity);
    };

    const decrementQuantity = async (itemId) => {
        const item = cartItems.find((item) => item._id === itemId);
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : item.quantity;
        await handleQuantityChange(itemId, newQuantity);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const clearCart = async () => {
        try {
            await cartApi.clearCart(userId);
            setCartItems([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const primary = "text-primary"

    return (
        <div>
            <Header />
            <div className="container mx-auto my-8 min-h-[75vh]">
                <h1 className="text-4xl font-bold mb-4 text-center">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className='w-full flex items-center min-h-[65vh] justify-center'>
                        <div className='flex flex-col items-center'>
                            <p>Your shopping cart is empty.</p>
                            <a href="/products"><button className='p-6 py-3 m-4 bg-green-500 text-white rounded-full'>Start shopping</button></a>
                        </div>
                    </div>
                ) : (
                    <div className='max-w-[70%] m-auto'>
                        <div>
                            {cartItems.map((item) => (
                                <div key={item._id} className={`flex items-center ${primary} justify-between border-b p-4`}>
                                    <div className="flex items-center">
                                        <a href={`/product/${item.product.id}`}>
                                            <img src={item.product.img} alt={item.product.name} className="w-20 h-20 object-cover rounded-full mr-4" />
                                        </a>
                                        <div>
                                            <a href={`/product/${item.product.id}`}><p className="font-bold">{item.product.name}</p></a>
                                            <div className="flex items-center mt-2">
                                                <Tooltip title='Decrease quantity'>
                                                    <button
                                                        onClick={() => decrementQuantity(item._id)}
                                                        className="border rounded-full p-2 py-1 bg-red-500 text-white font-bold mr-3"
                                                    >
                                                        -
                                                    </button>
                                                </Tooltip>
                                                <span>{item.quantity}</span>
                                                <Tooltip title='Increase quantity'>
                                                    <button
                                                        onClick={() => incrementQuantity(item._id)}
                                                        className="border rounded-full p-2 py-1 bg-green-500 text-white font-bold ml-3"
                                                    >
                                                        +
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <p>₹{(item.price * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                                        <Tooltip title="Delete Item">
                                            <IconButton
                                                onClick={() => handleRemoveItem(item.product.id)}
                                                className="ml-4 text-red-500 focus:outline-none"
                                            >
                                                <DeleteIcon style={{ color: 'red' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="my-4 flex flex-row-reverse">
                            <button
                                onClick={handleBuyNow}
                                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none"
                            >
                                Checkout
                                <p className="font-bold inline">: ₹ {calculateTotal().toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                            </button>
                            <button
                                onClick={clearCart}
                                className="mx-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
