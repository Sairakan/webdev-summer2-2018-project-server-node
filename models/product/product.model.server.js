var mongoose = require('mongoose');
var productSchema = require('./product.schema.server');
var productModel = mongoose.model('ProductModel', productSchema);

function createProduct(product) {
    return productModel.create(product);
}

function findProductById(productId) {
    return productModel.findOne({ _id: productId });
}

function updateProduct(productId, newProduct) {
    return productModel.update({ _id: productId }, { $set: newProduct });
}

function deleteProduct(productId) {
    return productModel.remove({ _id: productId });
}

function findAllProducts() {
    return productModel.find();
}

function findProductByOCPC(ocpc) {
    return productModel.find({ocpc: ocpc});
}

function setActive(productId) {
    return productModel.update({ '_id': productId }, { $set: { 'active': true } }, (err, raw) => { });
}

function findAllActiveProducts() {
    return productModel.find({ active: true });
}

module.exports = {
    createProduct,
    findProductById,
    updateProduct,
    deleteProduct,
    findAllProducts,
    findProductByOCPC,
    setActive,
    findAllActiveProducts
};