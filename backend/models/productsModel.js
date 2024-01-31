const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    productImg: { type: String },
    attributes: {
        colour: { type: String },
        size: { type: String },
    },
    price: { type: Number, required: true },
    categories: [{ type: String }],
});

const Product = mongoose.model('Product', ProductSchema);


module.exports = { Product };