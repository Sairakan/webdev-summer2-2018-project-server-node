var mongoose = require('mongoose');
var productSchema = require('./product.schema.server');
var productModel = mongoose.model('ProductModel', productSchema);

function createProduct(product) {
    return productModel.create(product);
}

function findProductById(productId) {
    return productModel.find({ _id: productId });
}

function updateProduct(productId, newProduct) {
    return productModel.update({ _id: productId }, { $set: newProduct });
}

function deleteProduct(productId) {
    return productModel.remove({ _id: productId });
}

function findAllProducts() {
    return productModel.find().distinct('ocpc').exec();
}

function findProductByOCPC(ocpc) {
    return productModel.find({ocpc: ocpc});
}

module.exports = {
    createProduct,
    findProductById,
    updateProduct,
    deleteProduct,
    findAllProducts,
    findProductByOCPC
};