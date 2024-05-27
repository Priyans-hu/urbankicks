const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: false, unique: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    phone_number: { type: String,required: true, },
    address: {
        street: {type: String, required: true,},
        city: {type: String, required: true,},
        state: {type: String, required: true,},
        postal_code: {type: String, required: true,},
        country: {type: String, required: true,},
    },
    order_history: [{
            order_id: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Order',
            },},],

    created_at: { type: Date, default: Date.now, },
    updated_at: { type: Date, default: Date.now, },
});

const Users = mongoose.model('User', UserSchema);
module.exports = { Users };