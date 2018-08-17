var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    ocpc: String,
    name: String,
    availability: Number,
    price: Number,
    image: String
}, { collection: 'product' });

module.exports = productSchema;