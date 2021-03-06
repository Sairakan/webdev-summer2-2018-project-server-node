var mongoose = require('mongoose');
var inventorySchema = require('./inventory.schema.server');
var inventoryModel = mongoose.model('InventoryModel', inventorySchema);

function createInventory(inventory) {
    return inventoryModel.create(inventory);
}

function findAllInventories() {
    return inventoryModel.find()
        .populate('items.product')
        .populate('owner');
}

function findInventoryByOwner(ownerId) {
    return inventoryModel.find({ owner: ownerId }).populate('items.product').exec();
}

function findInventoryById(id) {
    return inventoryModel.findOne({_id: id});
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

function subtractProductFromInventory(ownerId, productId, amount) {
    return inventoryModel.update({owner: ownerId, 'items.product': productId},
        {$inc: {'items.$.count': -amount}}, (err, res) => {})
}

function restock(order) {
    for (let item of order.items) {
        inventoryModel.update({owner: order.receiver._id, 'items.product': item.product._id},
        {$inc: {'items.$.count': item.count}}, (err, res) => {})
    }
}

module.exports = {
    createInventory,
    findAllInventories,
    findInventoryByOwner,
    findInventoryById,
    findInventoriesWithProduct,
    updateInventory,
    deleteInventory,
    addProductToInventory,
    deleteProductFromInventory,
    findItemInInventory,
    updateInventoryProduct,
    subtractProductFromInventory,
    restock
};