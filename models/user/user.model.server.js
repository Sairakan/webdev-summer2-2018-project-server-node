var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
// mongoose.connect('mongodb://localhost:27017/webdev-summer2-2018', { useNewUrlParser: true });
var userModel = mongoose.model('UserModel', userSchema);

const findAllUsers = () => userModel.find();

const findUserById = (userId) => {
    return userModel.findById(userId);
}
const findUserByUsername = (username) => {
    return userModel.findOne({ username: username });
}
const findUserByCredentials = (username, password) => {
    return userModel.findOne({ username: username, password: password });
}
const createUser = (user) => {
    console.log(user);
    return userModel.create(user);
}
const deleteUser = (userId) => {
    return userModel.remove({ _id: userId });
}
const updateUser = (userId, newUser) => {
    delete newUser._id;
    return userModel.update({ _id: userId }, { $set: newUser });
}

const findUserByEmail = (email) => {
    return userModel.findOne({ email: email });
}

const findUserByEmailAndPassword = (email, password) => {
    return userModel.findOne({ email: email, password: password });
}

function updateShoppingCart(userId, cart) {
    return userModel.update({ _id: userId }, { $set: { shoppingCart: cart } })
}

module.exports = {
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    createUser,
    deleteUser,
    updateUser,
    findUserByEmail,
    findUserByEmailAndPassword, 
    updateShoppingCart
};