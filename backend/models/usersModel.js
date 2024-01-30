const mongoose = require('mongoose');

// defining the schema for the users collection
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    order_history: [
        {
            order_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            }
        },
    ],
});

// creating a model using the defined schema
const Users = mongoose.model('User', UserSchema);

// exporting the module to access it from other files
module.exports = { Users };