var mongoose = require('mongoose');

var inventorySchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel'
    }]
}, {collection: 'inventory'});

module.exports = inventorySchema;