import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cartApi from '../api/cartApi';
import orderApi from '../api/orderApi';
import CartItemCard from '../components/CartItemCard';

import { toast } from 'react-toastify';

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

    const placeOrder = async () => {
        try {
            const orderData = {
                userId: userId,
                products: cartItems.map(item => ({ product_id: item.product.id, quantity: item.quantity })),
                total_amount: calculateTotal()
            };
            const response = await orderApi.createOrder(orderData);
            if (response.status === 201) {
                await clearCart();
                toast.success('Order placed successfully!', {position: 'bottom-right'});
                } else {
                console.error('Failed to create order:', response.data);
                toast.error('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('An error occurred. Please try again.', {position: 'bottom-right'});
        }
    };

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
                    <div className='w-full sm:max-w-[70%] m-auto'>
                        <div>
                            {cartItems.map((item) => (
                                <CartItemCard item={item} userId={userId} setCartItems={setCartItems} cartItems={cartItems}/>
                            ))}
                        </div>
                        <div className="w-[90%] m-auto sm:w-full my-4 flex flex-row-reverse">
                            <button
                                onClick={placeOrder}
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
