const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    total_amount: { type: Number, required: true },
    order_date: { type: Date, default: Date.now },
    order_status: { type: String, default: "Pending" },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
