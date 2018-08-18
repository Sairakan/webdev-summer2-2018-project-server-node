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
    return inventoryModel.find({ owner: ownerId }).populate('items').exec();
}

function findInventoriesWithProduct(product) {
    return inventoryModel.find({ 'items.ocpc': product.ocpc });
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
        $pull: {items: productId}
    });
}

module.exports = {
    createInventory,
    findAllInventories,
    findInventoryByOwner,
    findInventoriesWithProduct,
    updateInventory,
    deleteInventory,
    addProductToInventory,
    deleteProductFromInventory
};