var mongoose = require('mongoose');
var orderSchema = require('./order.schema.server');
var orderModel = mongoose.model('OrderModel', orderSchema);

function createOrder(order) {
    return orderModel.create(order);
}

function findAllOrders() {
    return orderModel.find();
}

function findOrderById(orderId) {
    return orderModel.find({ _id: orderId });
}

function findOrdersFromUser(userId) {
    return orderModel.find({ requester: userId });
}

function findOrdersToUser(userId) {
    return orderModel.find({ receiver: userId });
}

function updateOrderStatus(orderId, status) {
    return orderModel.update({ _id: orderId }, { $set: {status} });
}

function deleteOrder(orderId) {
    return orderModel.remove({ _id: orderId });
}

module.exports = {
    createOrder,
    findAllOrders,
    findOrderById,
    findOrdersFromUser,
    findOrdersToUser,
    updateOrderStatus,
    deleteOrder
};