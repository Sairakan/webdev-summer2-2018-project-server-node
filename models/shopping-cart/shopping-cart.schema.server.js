var mongoose = require('mongoose');

var shoppingCartSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    items: [{
        retailer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel'
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductModel'
        },
        count: Number,
        price: Number
    }]
}, { collection: 'shopping-cart' });

module.exports = shoppingCartSchema;