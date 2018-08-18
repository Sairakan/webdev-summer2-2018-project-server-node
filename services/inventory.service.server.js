module.exports = (app) => {

    let inventoryModel = require('../models/inventory/inventory.model.server');
    let productModel = require('../models/product/product.model.server');

    function createInventory(req, res) {
        for (let item of req.body.items) {
            productModel.setActive(item.product);
        }
        inventoryModel.createInventory(req.body)
            .then(inventory => res.send(inventory));
    }

    function findInventoryByOwner(req, res) {
        inventoryModel.findInventoryByOwner(req.params.userId)
            .then(inventory => res.send(inventory));
    }

    function updateInventory(req, res) {
        inventoryModel.updateInventory(req.params.inventoryId, req.body)
            .then(inventory => res.send(inventory));
    }

    function deleteProductFromInventory(req, res) {
        inventoryModel.deleteProductFromInventory(req.params.inventoryId, req.params.productId)
            .then(inventory => res.send(inventory));
    }

    function addProductToInventory(req, res) {
        console.log(req.body)
        inventoryModel.addProductToInventory(req.params.inventoryId, req.body)
            .then(inventory => res.send(inventory));
    }

    function deleteInventory(req, res) {
        inventoryModel.deleteInventory(req.params.inventoryId)
            .then(result => res.send(result));
    }

    function findAllInventories(req, res) {
        inventoryModel.findAllInventories()
            .then(result => res.send(result));
    }

    function findItemInInventory(req, res) {
        inventoryModel.findItemInInventory(req.params.inventoryId, req.params.id)
            .then(result => res.send(result));
    }

    function updateInventoryProduct(req, res) {
        inventoryModel.updateInventoryProduct(req.params.id, req.body)
            .then(inventory => res.send(inventory));
    }

    app.post('/api/inventory', createInventory);
    app.get('/api/inventory/:userId', findInventoryByOwner);
    app.put('/api/inventory/:inventoryId', updateInventory);
    app.put('/api/inventory/:inventoryId/product/:productId', addProductToInventory);
    app.delete('/api/inventory/:inventoryId', deleteInventory);
    app.get('/api/inventory', findAllInventories);
    app.delete('/api/inventory/:inventoryId/product/:productId', deleteProductFromInventory);
    app.get('/api/inventory/:inventoryId/item/:id', findItemInInventory);
    app.put('/api/inventory/item/:id', updateInventoryProduct);
}