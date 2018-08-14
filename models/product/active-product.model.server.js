var mongoose = require('mongoose');
var activeProductSchema = require('./active-product.schema.server');
var activeProductModel = mongoose.model('ActiveProductModel', activeProductSchema);

function addProduct(product) {
    activeProductModel.findOne({ocpc: product.ocpc})
        .then(product => {
            if (product) {
                return activeProductModel.create(product);
            }
        });
}

function findAllActiveProducts() {
    return activeProductModel.find();
}

module.exports = {
    addProduct,
    findAllActiveProducts
};