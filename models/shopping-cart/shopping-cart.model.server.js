var mongoose = require('mongoose');
var shoppingCartSchema = require('./shopping-cart.schema.server');
var shoppingCartModel = mongoose.model('ShoppingCartModel', shoppingCartSchema);

function createShoppingCart(shoppingCart) {
    return shoppingCartModel.create(shoppingCart);
}

function findShoppingCartByOwner(ownerId) {
    return shoppingCartModel.find({ _id: ownerId });
}

function updateShoppingCart(shoppingCartId, newShoppingCart) {
    return shoppingCartModel.update({ _id: shoppingCartId }, { $set: newShoppingCart });
}

function deleteShoppingCart(shoppingCartId) {
    return shoppingCartModel.remove({ _id: shoppingCartId });
}

module.exports = {
    createShoppingCart,
    findShoppingCartByOwner,
    updateShoppingCart,
    deleteShoppingCart
};