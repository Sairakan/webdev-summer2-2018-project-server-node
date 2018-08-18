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
        inventoryModel.addProductToInventory(req.params.inventoryId, req.params.productId)
            .then(inventory => res.send(inventory));
    }

    function deleteInventory(req, res) {
        inventoryModel.deleteInventory(req.params.inventoryId)
            .then(result => res.send(result));
    }

    function findInventoriesWithProduct(req, res) {
        inventoryModel.findInventoriesWithProduct(req.params.productId)
            .then(inventories => res.send(inventories));
    }

    function findAllInventories(req, res) {
        inventoryModel.findAllInventories()
            .then(result => res.send(result));
    }

    app.post('/api/inventory', createInventory);
    app.get('/api/inventory/:userId', findInventoryByOwner);
    app.put('/api/inventory/:inventoryId', updateInventory);
    app.put('/api/inventory/:inventoryId/product/:productId', addProductToInventory);
    app.delete('/api/inventory/:inventoryId', deleteInventory);
    app.get('/api/inventory/product/:productId', findInventoriesWithProduct);
    app.get('/api/inventory', findAllInventories);
    app.delete('/api/inventory/:inventoryId/product/:productId', deleteProductFromInventory);
}