const { Order } = require('../models/ordersModel');
const { Product } = require('../models/productsModel');
const mongoose = require('mongoose');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product_id', 'name price'); // Populate product details
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        const userOrders = await Order.find({ user_id: userId }).populate('products.product_id', 'name price');
        res.json(userOrders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createOrder = async (req, res) => {
    const { userId, products, total_amount } = req.body;

    try {
        // Iterate over each product to check quantity and update it
        for (const item of products) {
            const product = await Product.findById(item.product_id);
            if (!product) {
                return res.status(404).json({ message: `Product with id ${item.product_id} not found` });
            }

            if (product.quantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient quantity for product ${product.name}` });
            }

            product.quantity -= item.quantity;
            await product.save();
        }

        // Create and save the order
        const newOrder = new Order({
            user_id: userId,
            products,
            total_amount
        });
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId).populate('products.product_id', 'name price');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { order_status: status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllOrders,
    getUserOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};