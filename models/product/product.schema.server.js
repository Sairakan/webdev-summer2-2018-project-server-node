var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    ocpc: String,
    brand: {
        name: String,
        ocpc: String
    },
    type: String,
    strain: {
        name: String,
        ocpc: String
    },
    description: String,
    qr: String,
    url: String,
    image: String,
    labTest: false,
    thc: false,
    cbd: false,
    cannabis: false,
    hashOil: false
}, { collection: 'product' });

module.exports = productSchema;