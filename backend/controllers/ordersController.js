const { Order } = require('../models/ordersModel');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product_id', 'name price'); // Populate product details
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createOrder = async (req, res) => {
    const newOrder = req.body;

    try {
        const userId = req.user._id;
        newOrder.user_id = userId;

        const orderDetails = new Order(newOrder);
        const savedOrder = await orderDetails.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId).populate('products.product_id', 'name price'); // Populate product details
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
    const { order_status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { order_status }, { new: true });
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
        const deletedOrder = await Order.findByIdAndRemove(orderId);
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
    createOrder,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};
