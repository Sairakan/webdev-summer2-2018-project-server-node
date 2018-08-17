var mongoose = require('mongoose');
var inventorySchema = require('./inventory.schema.server');
var inventoryModel = mongoose.model('InventoryModel', inventorySchema);

function createInventory(inventory) {
    return inventoryModel.create(inventory);
}

function findAllInventories() {
    return inventoryModel.find();
}

function findInventoryByOwner(ownerId) {
    return inventoryModel.find({ _id: ownerId });
}

function findInventoriesWithProduct(product) {
    return inventoryModel.find({ 'items.product._id': product._id })
        .populate('owner')
        .populate('items.product');
}

function updateInventory(inventoryId, newInventory) {
    return inventoryModel.update({ _id: inventoryId }, { $set: newInventory });
}

function deleteInventory(inventoryId) {
    return inventoryModel.remove({ _id: inventoryId });
}

module.exports = {
    createInventory,
    findAllInventories,
    findInventoryByOwner,
    findInventoriesWithProduct,
    updateInventory,
    deleteInventory
};