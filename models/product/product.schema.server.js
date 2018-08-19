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
    labTest: String,
    thc: String,
    cbd: String,
    cannabis: String,
    hashOil: String,
    listedByRetailer: Boolean,
    listedByProducer: Boolean
}, { collection: 'product' });

module.exports = productSchema;