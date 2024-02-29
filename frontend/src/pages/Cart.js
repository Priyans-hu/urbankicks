import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, addToCart, calculateTotal } = useCart();

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };

    const handleBuyNow = () => {
        const totalAmount = calculateTotal();
        const numberOfProducts = cartItems.length;
        const productIds = cartItems.map((item) => item.id);

        // Display information or navigate to a new page with the relevant data
        alert(`Buy Now!\nTotal Amount: ₹${totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}\nNumber of Products: ${numberOfProducts}\nProduct IDs: ${productIds.join(', ')}`);
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        // Update the quantity of the item in the cart
        addToCart({ id: itemId, quantity: newQuantity });
    };

    const incrementQuantity = (itemId) => {
        handleQuantityChange(itemId, cartItems.find((item) => item._id === itemId).quantity + 1);
    };

    const decrementQuantity = (itemId) => {
        const currentQuantity = cartItems.find((item) => item._id === itemId).quantity;
        if (currentQuantity > 1) {
            handleQuantityChange(itemId, currentQuantity - 1);
        }
    };

    useEffect(() => {
        // Perform any side effect when cartItems change
        // For example, you can update the document title
        document.title = `Shopping Cart (${cartItems.length} items)`;
    }, [cartItems]);

    return (
        <div>
            <Header />
            <div className="container mx-auto my-8 min-h-[75vh]">
                <h1 className="text-4xl font-bold mb-4 text-center">Shopping Cart</h1>

                {/* if cart length is zero then the cart is empty */}
                {cartItems.length === 0 ? (
                    <div className='w-full flex items-center min-h-[65vh] justify-center'>
                        <div className='flex flex-col items-center'>
                            <p>Your shopping cart is empty.</p>
                            <a href="/products"><button className='p-6 py-3 m-4 bg-green-500 text-white rounded-full'>Start shopping</button></a>
                        </div>
                    </div>
                ) : (
                    <div className='max-w-[70%] m-auto'>
                        {/* Cart items */}
                        <div>
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center justify-between border-b p-4">
                                    <div className="flex items-center">
                                        <img src={item.productImg} alt={item.name} className="w-20 h-20 object-cover rounded-full mr-4" />
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    onClick={() => decrementQuantity(item._id)}
                                                    className="border rounded-full p-2 bg-red-500 text-white font-bold mr-3"
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => incrementQuantity(item._id)}
                                                    className="border rounded-full p-2 bg-green-500 text-white font-bold ml-3"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <p>₹{(item.price * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                                        <button
                                            onClick={() => handleRemoveItem(item._id)}
                                            className="ml-4 text-red-500 focus:outline-none"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="my-4 flex flex-row-reverse">
                            <button
                                onClick={handleBuyNow}
                                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none"
                            >
                                Checkout
                                <p className="font-bold inline">: ₹{calculateTotal().toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                            </button>
                            <button
                                onClick={clearCart}
                                className="mx-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none"
                            >
                                Clear
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
