var mongoose = require('mongoose');
var inventorySchema = require('./inventory.schema.server');
var inventoryModel = mongoose.model('InventoryModel', inventorySchema);

function createInventory(inventory) {
    return inventoryModel.create(inventory);
}

function findAllInventories() {
    return inventoryModel.find()
        .populate('items.product');
}

function findInventoryByOwner(ownerId) {
    return inventoryModel.find({ owner: ownerId }).populate('items.product').exec();
}

function findInventoriesWithProduct(productId) {
    return inventoryModel.find({ 'items.product': productId })
        .populate('owner')
        .populate('items.product');
}

function updateInventory(inventoryId, newInventory) {
    return inventoryModel.update({ _id: inventoryId }, { $set: newInventory });
}

function deleteInventory(inventoryId) {
    return inventoryModel.remove({ _id: inventoryId });
}

function addProductToInventory (inventoryId, productId) {
    return inventoryModel.update({_id: inventoryId}, {
        $push: {items: productId}
    });
}

function deleteProductFromInventory (inventoryId, productId) {
    return inventoryModel.update({_id: inventoryId}, {
        $pull: {items: {'_id' : productId}}
    });
}

function findItemInInventory(id) {
    return inventoryModel.find({'items._id': id }).populate('items.product').exec();
}

function updateInventoryProduct(inventoryId, itemId, product) {
    return this.deleteProductFromInventory(inventoryId, itemId)
        .then(inv => this.addProductToInventory(inventoryId, product))

}

function restock(order) {
    for (let item of order.items) {
        
    }
}

module.exports = {
    createInventory,
    findAllInventories,
    findInventoryByOwner,
    findInventoriesWithProduct,
    updateInventory,
    deleteInventory,
    addProductToInventory,
    deleteProductFromInventory,
    findItemInInventory,
    updateInventoryProduct,
    restock
};