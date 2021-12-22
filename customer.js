const mongoose = require('mongoose')
const Schema = mongoose.Schema
const customerSchema = new Schema({
    name:String,
    phoneNumber:Number,
    password:String,
    email:String,
    shippingAddress:String,
    billingAddress:String
})

var customer  = mongoose.model('customers',customerSchema)
module.exports = {customer}
