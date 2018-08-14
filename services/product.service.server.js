module.exports = (app) => {

    let activeProductModel = require('../models/product/active-product.model.server');
    let productModel = require('../models/product/product.model.server');

    function findAllActiveProducts(req, res) {
        activeProductModel.findAllActiveProducts()
            .then(products => res.send(products));
    }

    function findProductById(req, res) {
        productModel.findProductById(req.params.productId)
            .then(product => res.send(product));
    }

    function createProduct(req, res) {
        productModel.createProduct(req.body)
            .then(result => res.send(result));
    }

    function updateProduct(req, res) {
        productModel.updateProduct(req.params.productId, req.body)
            .then(result => res.send(result));
    }

    function deleteProduct(req, res) {
        productModel.deleteProduct(req.params.productId)
            .then(result => res.send(result));
    }

    app.get('/api/product', findAllActiveProducts);
    app.get('/api/product/:productId', findProductById);
    app.post('/api/product', createProduct);
    app.put('/api/product/:productId', updateProduct);
    app.delete('/api/product/:productId', deleteProduct);
}