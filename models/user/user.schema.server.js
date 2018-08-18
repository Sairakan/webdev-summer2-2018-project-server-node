var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: { type : String , unique : true, required : true, dropDups: true },
    password: String,
    firstName: String,
    lastName: String,
    phone: Number,
    street:String,
    city:String,
    state:String,
    zip:Number,
    profileImage:String,
    userType: {
        type: String,
        enum: [
          'ADMIN',
          'PRODUCER',
          'RETAILER',
          'BUYER'
        ],
        default: 'BUYER'
    }
}, { collection: 'user' });

module.exports = userSchema;