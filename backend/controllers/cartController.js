const { default: mongoose } = require('mongoose');
const { Cart } = require('../models/cartModel');
const { Product } = require('../models/productsModel');

const getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }        

        // Manually fetch and attach product details to items
        const populatedCart = await populateCartItems(cart);

        res.status(200).json(populatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to manually populate cart items with product details
const populateCartItems = async (cart) => {
    const populatedItems = await Promise.all(cart.items.map(async (item) => {
        const product = await Product.findById(item.product);
        return { ...item.toObject(), product: { id: product._id , img: product.productImg, name: product.name, price: product.price } };
    }));

    return { ...cart.toObject(), items: populatedItems };
};


// Add item to cart
const addItemToCart = async (req, res) => {
    const { user, productId, quantity, price } = req.body;
    try {
        let cart = await Cart.findOne({ user });
        if (!cart) {
            cart = new Cart({ user, items: [] });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        
        if (existingItemIndex !== -1) {
            // Update quantity if item already exists
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.items.push({ product: productId, quantity, price });
        }
        
        cart.total += quantity * price;
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === req.params.productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        const removedItem = cart.items.splice(itemIndex, 1)[0]; // Remove the item and get the removed item
        cart.total -= removedItem.quantity * removedItem.price; // Update the total price

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update item in cart
const updateItemInCart = async (req, res) => {
    try {
        const { user, item: productId, quantity } = req.body;
        const cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(cartItem => cartItem._id.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        const currentItem = cart.items[itemIndex];
        const oldQuantity = currentItem.quantity;

        // Update quantity of the item
        currentItem.quantity = quantity;

        // Remove item if new quantity is less than one or equal to zero
        if (currentItem.quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            // Update total price of the cart
            cart.total += (quantity - oldQuantity) * currentItem.price;
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = [];
        cart.total = 0;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getCartByUserId,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
    clearCart,
}