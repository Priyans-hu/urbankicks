const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products', 
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
});

const CartSchema = new mongoose.Schema({
    user: {
        type: String, 
        required: true
    },
    items: [CartItemSchema],
    total: {
        type: Number,
        default: 0
    }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart };