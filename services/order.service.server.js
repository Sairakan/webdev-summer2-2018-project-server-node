module.exports = (app) => {

    let orderModel = require('../models/order/order.model.server');
    let inventoryModel = require('../models/inventory/inventory.model.server');

    function createOrder(req, res) {
        for (let item of req.body.items) {
            inventoryModel.subtractProductFromInventory(req.body.receiver, item.product, item.count);
        }
        orderModel.createOrder(req.body)
            .then(order => res.send(order));
    }

    function findAllOrders(req, res) {
        orderModel.findAllOrders()
            .then(orders => res.send(orders));
    }

    function findOrderById(req, res) {
        orderModel.findOrderById(req.params.orderId)
            .then(order => res.send(order));
    }

    function findOrdersFromUser(req, res) {
        orderModel.findOrdersFromUser(req.params.userId)
            .then(orders => res.send(orders));
    }

    function findOrdersofStatusFromUser(req, res) {
        orderModel.findOrdersofStatusFromUser(req.params.userId, req.params.status)
            .then(orders => res.send(orders));
    }

    function findOrdersToUser(req, res) {
        orderModel.findOrdersToUser(req.params.userId)
            .then(orders => res.send(orders));
    }

    function findOrdersofStatusToUser(req, res) {
        orderModel.findOrdersofStatusToUser(req.params.userId, req.params.status)
            .then(orders => res.send(orders));
    }

    function updateOrderStatus(req, res) {
        orderModel.updateOrderStatus(req.params.orderId, req.body)
            .then(result => res.send(result));
    }

    function deleteOrder(req, res) {
        orderModel.deleteOrder(req.params.orderId)
            .then(result => res.send(result));
    }

    app.post('/api/order', createOrder);
    app.get('/api/order', findAllOrders);
    app.get('/api/order/:orderId', findOrderById);
    app.get('/api/order/from/:userId', findOrdersFromUser);
    app.get('/api/order/to/:userId', findOrdersToUser);
    app.put('/api/order/:orderId', updateOrderStatus);
    app.delete('/api/order/:orderId', deleteOrder);
    app.get('/api/order/from/:userId/status/:status', findOrdersofStatusFromUser);
    app.get('/api/order/to/:userId/status/:status', findOrdersofStatusToUser);
}