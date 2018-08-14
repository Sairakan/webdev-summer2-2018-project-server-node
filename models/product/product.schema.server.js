var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    ocpc: String,
    availability: Number,
    price: Number
}, { collection: 'product' });

module.exports = productSchema;