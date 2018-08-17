module.exports = (app) => {

    let inventoryModel = require('../models/inventory/inventory.model.server');
    let activeProductModel = require('../models/product/active-product.model.server');

    function createInventory(req, res) {
        for (let item of req.body.items) {
            activeProductModel.addProduct(item.product);
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

    function deleteInventory(req, res) {
        inventoryModel.deleteInventory(req.params.inventoryId)
            .then(result => res.send(result));
    }

    function findInventoriesWithProduct(req, res) {
        inventoryModel.findInventoriesWithProduct(req.params.productId)
            .then(inventories => res.send(inventories));
    }

    app.post('/api/inventory', createInventory);
    app.get('/api/inventory/:userId', findInventoryByOwner);
    app.put('/api/inventory/:inventoryId', updateInventory);
    app.delete('/api/inventory/:inventoryId', deleteInventory);
    app.get('/api/inventory/product/:productId', findInventoriesWithProduct);
}