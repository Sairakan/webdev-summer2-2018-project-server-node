var mongoose = require('mongoose');

var inventorySchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    items: [{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductModel'
        },
        availability: Number,
        price: Number
    }]
}, {collection: 'inventory'});

module.exports = inventorySchema;