module.exports = (app) => {

    let productModel = require('../models/product/product.model.server');

    function findListedByRetailer(req, res) {
        return productModel.findListedByRetailer()
            .then(products => res.send(products));
    }

    function findListedByProducer(req, res) {
        return productModel.findListedByProducer()
            .then(products => res.send(products));
    }

    function findAllProducts(req, res) {
        return productModel.findAllProducts()
            .then(products => res.send(products));
    }

    function findProductById(req, res) {
        return productModel.findProductById(req.params.productId)
            .then(product => res.send(product));
    }

    function findProductByOCPC(req, res) {
        return productModel.findProductByOCPC(req.params.ocpc)
            .then(product => res.send(product));
    }

    function createProduct(req, res) {
        return productModel.createProduct(req.body)
            .then(result => res.send(result));
    }

    function updateProduct(req, res) {
        return productModel.updateProduct(req.params.productId, req.body)
            .then(result => res.send(result));
    }

    function deleteProduct(req, res) {
        return productModel.deleteProduct(req.params.productId)
            .then(result => res.send(result));
    }

    app.get('/api/product/retailer', findListedByRetailer);
    app.get('/api/product/producer', findListedByProducer);
    app.get('/api/product', findAllProducts);
    app.get('/api/product/:productId', findProductById);
    app.post('/api/product', createProduct);
    app.put('/api/product/:productId', updateProduct);
    app.delete('/api/product/:productId', deleteProduct);
    app.get('/api/product/ocpc/:ocpc', findProductByOCPC);


    // let fetch = require('node-fetch');
    // //  initialization
    // fetch('https://api.otreeba.com/v1/products?count=50')
    //     .then(response => response.json())
    //     .then(list => {
    //         for (let product of list.data) {
    //             productModel.createProduct(product);
    //         }
    //     });
}