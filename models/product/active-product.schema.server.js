var mongoose = require('mongoose');

var activeProductSchema = mongoose.Schema({
    ocpc: String
}, { collection: 'active-product' });

module.exports = activeProductSchema;