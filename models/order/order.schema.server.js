var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductModel'
        },
        count: Number,
        pricePerUnit: Number
    }],
    status: {
        type: String,
        enum: [
            'OPEN',
            'FULFILLED',
            'CANCELLED'
        ]
    }
},
    {timestamps: true},
    { collection: 'order' });

module.exports = orderSchema;