import React from 'react';
import cartApi from '../api/cartApi';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItemCard = ({ item, cartItems, setCartItems, userId }) => {
    
    const handleRemoveItem = async (itemId) => {
        try {
            await cartApi.removeItemFromCart(userId, itemId);
            setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
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
    
    return (
        <div>
            <div key={item._id} className={`flex items-center justify-between border-b p-4`}>
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
        </div>
    )
}

export default CartItemCard;