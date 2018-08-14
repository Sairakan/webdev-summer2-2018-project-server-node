module.exports = (app) => {

    let shoppingCartModel = require('../models/shopping-cart/shopping-cart.model.server');

    function createShoppingCart(req, res) {
        shoppingCartModel.createShoppingCart(req.body)
            .then(cart => res.send(cart));
    }

    function findShoppingCartByOwner(req, res) {
        shoppingCartModel.findShoppingCartByOwner(req.params.userId)
            .then(cart => res.send(cart));
    }

    function updateShoppingCart(req, res) {
        shoppingCartModel.updateShoppingCart(req.params.cartId, req.body)
            .then(cart => res.send(cart));
    }

    function deleteShoppingCart(req, res) {
        shoppingCartModel.deleteShoppingCart(req.params.cartId)
            .then(result => res.send(result));
    }

    app.post('/api/cart', createShoppingCart);
    app.get('/api/cart/:userId', findShoppingCartByOwner);
    app.put('/api/cart/:cartId', updateShoppingCart);
    app.delete('/api/cart/:cartId', deleteShoppingCart);
}